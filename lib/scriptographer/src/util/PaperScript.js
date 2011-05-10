/*
 * Paper.js
 *
 * This file is part of Paper.js, a JavaScript Vector Graphics Library,
 * based on Scriptographer.org and designed to be largely API compatible.
 * http://paperjs.org/
 * http://scriptographer.org/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * Copyright (c) 2011, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * All rights reserved.
 */

var PaperScript = this.PaperScript = new function() {
//TODO: Make sure there are all the correct copyrights for the inlined parse-js:
//#include "../../lib/parse-js-min.js"

	// Math Operators

	var operators = {
		'+': 'add',
		'-': 'subtract',
		'*': 'multiply',
		'/': 'divide',
		'%': 'modulo',
		'==': 'equals',
		'!=': 'equals'
	};

	function $eval(left, operator, right) {
		var handler = operators[operator];
		if (left && left[handler]) {
			var res = left[handler](right);
			return operator == '!=' ? !res : res;
		}
		switch (operator) {
		case '+': return left + right;
		case '-': return left - right;
		case '*': return left * right;
		case '/': return left / right;
		case '%': return left % right;
		case '==': return left == right;
		case '!=': return left != right;
		default:
			throw new Error('Implement Operator: ' + operator);
		}
	};

	// Sign Operators

	var signOperators = {
		'-': 'negate'
	};

	function $sign(operator, value) {
		var handler = signOperators[operator];
		if (value && value[handler]) {
			return value[handler]();
		}
		switch (operator) {
		case '+': return +value;
		case '-': return -value;
		default:
			throw new Error('Implement Sign Operator: ' + operator);
		}
	}

	// AST Helpers

	function isDynamic(exp) {
		var type = exp[0];
		return type != 'num' && type != 'string';
	}

	function handleOperator(operator, left, right) {
		// Only replace operators with calls to $operator if the left hand side
		// is potentially an object.
		if (operators[operator] && isDynamic(left)) {
			// Replace with call to $operator(left, operator, right):
			return ['call', ['name', '$eval'],
					[left, ['string', operator], right]];
		}
	}

	function compile(code) {
		// Use parse-js to translate the code into a AST structure which is then
		// walked and parsed for operators to overload. The resulting AST is
		// translated back to code and evaluated.
		var ast = parse_js.parse(code),
			walker = parse_js.walker(),
			walk = walker.walk;

		ast = walker.with_walkers({
			'binary': function(operator, left, right) {
				// Handle simple mathematical operators here:
				return handleOperator(operator, left = walk(left),
						right = walk(right))
						// Always return something since we're walking left and
						// right for the handleOperator() call already.
						|| [this[0], operator, left, right];
			},

			'assign': function(operator, left, right) {
				// Handle assignments like +=, -=, etc:
				// Check if the assignment operator needs to be handled by paper
				// if so, convert the assignment to a simple = and use result of
				// of handleOperator on the right hand side.
				var res = handleOperator(operator, left = walk(left),
						right = walk(right));
				if (res)
					return [this[0], true, left, res];
				// Always return something for the same reason as in binary
				return [this[0], operator, left, right];
			},

			'unary-prefix': function(operator, exp) {
				if (signOperators[operator] && isDynamic(exp)) {
					return ['call', ['name', '$sign'],
							[['string', operator], walk(exp)]];
				}
			}
		}, function() {
			return walk(ast);
		});

		return parse_js.stringify(ast, true);
	}

	function run(code) {
		with (paper) {
			var doc = paper.document,
				tool = paper.tool = /on(?:Key|Mouse)(?:Up|Down|Move|Drag)/.test(code)
					&& new Tool(null, doc),
				onEditOptions, onSelect, onDeselect, onReselect, onMouseDown,
				onMouseUp, onMouseDrag, onMouseMove, onKeyDown, onKeyUp,
				res = eval(compile(code));
			if (tool) {
				Base.each(['onEditOptions', 'onSelect', 'onDeselect',
						'onReselect', 'onMouseDown', 'onMouseUp', 'onMouseDrag',
						'onMouseMove', 'onKeyDown', 'onKeyUp'],
					function(key) {
						tool[key] = eval(key);
					}
				);
			}
			try {
				var onFrame = eval('onFrame');
				if (onFrame) {
					function frame() {
						// Request next frame already
						DomEvent.requestAnimationFrame(frame, doc && doc.canvas);
						onFrame();
						// Automatically redraw document each frame.
						if (doc)
							doc.redraw();
					};
					// Call the onFrame handler and redraw the document:
					frame();
				} else {
					// Automatically redraw document at the end.
					if (doc)
						doc.redraw();
				}
			} catch (e) {
			}
			return res;
		}
	}

//#ifdef BROWSER
	// Code borrowed from Coffee Script:
	function request(url) {
		var xhr = new (window.ActiveXObject || XMLHttpRequest)(
				'Microsoft.XMLHTTP');
		xhr.open('GET', url, true);
		if (xhr.overrideMimeType) {
			xhr.overrideMimeType('text/plain');
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				return run(xhr.responseText);
			}
		};
		return xhr.send(null);
	}

	function load() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0, l = scripts.length; i < l; i++) {
			var script = scripts[i];
			// Only load this cript if it not loaded already.
			if (script.type === 'text/paperscript'
					&& !script.getAttribute('loaded')) {
				// If a canvas id is provided, create a document for it now,
				// so the active document is defined.
				var canvas = script.getAttribute('canvas');
				if (canvas = canvas && document.getElementById(canvas)) {
					new Document(canvas);
				}
				if (script.src) {
					request(script.src);
				} else {
					run(script.innerHTML);
				}
				// Mark script as loaded now.
				script.setAttribute('loaded', true);
			}
		}
	}

	DomEvent.add(window, { load: load });

	return {
		compile: compile,
		run: run,
		load: load
	};

//#else // !BROWSER

	return {
		compile: compile,
		run: run
	};

//#endif // !BROWSER
};

// Export load directly:
this.load = PaperScript.load;
