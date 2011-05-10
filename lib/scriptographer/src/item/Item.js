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

var Item = this.Item = Base.extend({
	beans: true,

	initialize: function() {
		paper.document.activeLayer.appendTop(this);
		this.setStyle(this._document.getCurrentStyle());
	},

	/**
	 * Private notifier that is called whenever a change occurs in this item or
	 * its sub-elements, such as Segments, Curves, PathStyles, etc.
	 *
	 * @param {ChangeFlags} flags describes what exactly has changed.
	 */
	_changed: function(flags) {
		if (flags & ChangeFlags.PATH) {
			delete this._position;
		}
	},

	/**
	 * When passed a document, copies the item to the document,
	 * or duplicates it within the same document. When passed an item,
	 * copies the item into the specified item.
	 * 
	 * @param document the document to copy the item to
	 * @return the new copy of the item
	 */
	copyTo: function(itemOrDocument) {
		var copy = this.clone();
		if (itemOrDocument.layers) {
			itemOrDocument.activeLayer.appendTop(copy);
		} else {
			itemOrDocument.appendTop(copy);
		}
		return copy;
	},

	/**
	 * Clones the item within the same document.
	 * 
	 * @return the newly cloned item
	 */
	clone: function() {
		var copy = new this.constructor();
		// TODO: Copy children and other things.
		if (this.parent) {
			this.parent.appendTop(copy);
		}
		return copy;
	},

	setSelected: function(selected) {
		if (this.children) {
			for (var i = 0, l = this.children.length; i < l; i++) {
				this.children[i].setSelected(selected);
			}
		} else {
			if ((selected = !!selected) != this._selected) {
				// TODO: when an item is removed or moved to another
				// document, it needs to be removed from _selectedItems
				this._selected = selected;
				this._document._selectItem(this, selected);
			}
		}
	},
	
	isSelected: function() {
		if (this.children) {
			for (var i = 0, l = this.children.length; i < l; i++) {
				if (this.children[i].isSelected()) {
					return true;
				}
			}
		} else {
			return !!this._selected;
		}
		return false;
	},
	
	getDocument: function() {
		return this._document;
	},

	_setDocument: function(document) {
		if (this._document != document) {
			this._document = document;
			if (this.children) {
				for (var i = 0, l = this.children.length; i < l; i++) {
					this.children[i]._setDocument(document);
				}
			}
		}
	},
	
	// TODO: isFullySelected / setFullySelected

	/**
	 * Specifies whether the item is locked.
	 * 
	 * Sample code:
	 * <code>
	 * var path = new Path();
	 * print(path.locked) // false
	 * path.locked = true; // Locks the path
	 * </code>
	 * 
	 * @return {@true if the item is locked}
	 */
	locked: false,

	/**
	 * Specifies whether the item is visible.
	 * 
	 * Sample code:
	 * <code>
	 * var path = new Path();
	 * print(path.visible) // true
	 * path.visible = false; // Hides the path
	 * </code>
	 * 
	 * @return {@true if the item is visible}
	 */
	visible: true,

	/**
	 * The opacity of the item.
	 * 
	 * Sample code:
	 * <code>
	 * // Create a circle at position { x: 10, y: 10 } 
	 * var circle = new Path.Circle(new Point(10, 10), 10);
	 * 
	 * // Change the opacity of the circle to 50%:
	 * circle.opacity = 0.5;
	 * </code>
	 * 
	 * @return the opacity of the item as a value between 0 and 1.
	 */
	opacity: 1,

	/**
	 * The blend mode of the item.
	 * 
	 * Sample code:
	 * <code>
	 * var circle = new Path.Circle(new Point(50, 50), 10);
	 * print(circle.blendMode); // normal
	 * 
	 * // Change the blend mode of the path item:
	 * circle.blendMode = 'multiply';
	 * </code>
	 */
	blendMode: 'normal',

	/**
	 * Specifies whether the item is hidden.
	 * 
	 * Sample code:
	 * <code>
	 * var path = new Path();
	 * print(path.hidden); // false
	 * path.hidden = true; // Hides the path
	 * </code>
	 * 
	 * @return {@true if the item is hidden}
	 * 
	 * @jshide
	 */
	isHidden: function() {
		return !this.visible;
	},

	setHidden: function(hidden) {
		this.visible = !hidden;
	},

	/**
	 * Specifies whether the item defines a clip mask. This can only be set on
	 * paths, compound paths, and text frame objects, and only if the item is
	 * already contained within a clipping group.
	 * 
	 * Sample code:
	 * <code>
	 * var group = new Group();
	 * group.appendChild(path);
	 * group.clipped = true;
	 * path.clipMask = true;
	 * </code>
	 * 
	 * @return {@true if the item defines a clip mask}
	 */
	isClipMask: function() {
		return this._clipMask;
	},

	setClipMask: function(clipMask) {
		this._clipMask = clipMask;
		if (this._clipMask) {
			this.setFillColor(null);
			this.setStrokeColor(null);
		}
	},

	// TODO: getIsolated / setIsolated (print specific feature)
	// TODO: get/setKnockout (print specific feature)
	// TODO get/setAlphaIsShape
	// TODO: get/setData

	/**
	 * Reverses the order of this item's children
	 */
	reverseChildren: function() {
		if (this.children) {
			this.children.reverse();
			// TODO: Reassign _index
		}
	},

	/**
	 * The first item contained within this item.
	 */
	getFirstChild: function() {
		return this.children && this.children[0] || null;
	},

	/**
	 * The last item contained within this item.
	 */
	getLastChild: function() {
		return this.children && this.children[this.children.length - 1] || null;
	},

	/**
	 * The next item on the same level as this item.
	 */
	getNextSibling: function() {
		return this.parent && this.parent.children[this._index + 1] || null;
	},

	/**
	 * The previous item on the same level as this item.
	 */
	getPreviousSibling: function() {
		return this.parent && this.parent.children[this._index - 1] || null;
	},

	/**
	 * The index of this item within the list of it's parent's children.
	 */
	getIndex: function() {
		return this._index !== undefined ? this._index : null;
	},

	/**
	* Removes the item from its parent's children list.
	*/
	_removeFromParent: function() {
		if (this.parent) {
			var ok = !!Base.splice(this.parent.children, null,
					this._index, 1).length;
			this.parent = null;
			return ok;
		}
		return false;
	},

	/**
	* Removes the item.
	*/
	remove: function() {
		if (this.isSelected())
			this.setSelected(false);
		return this._removeFromParent();
	},

	/**
	 * {@grouptitle Tests}
	 * 
	 * Checks if the item contains any children items.
	 * 
	 * @return {@true if it has one or more children}
	 */
	hasChildren: function() {
		return this.children && this.children.length > 0;
	},

	/**
	 * Checks whether the item is editable.
	 * 
	 * @return {@true when neither the item, nor it's parents are locked or
	 * hidden}
	 */
	isEditable: function() {
		var parent = this;
		while (parent) {
			if (parent.hidden || parent.locked)
				return false;
			parent = parent.parent;
		}
		return true;
	},

	/**
	 * Checks whether the item is valid, i.e. it hasn't been removed.
	 * 
	 * Sample code:
	 * <code>
	 * var path = new Path();
	 * print(path.isValid()); // true
	 * path.remove();
	 * print(path.isValid()); // false
	 * </code>
	 * 
	 * @return {@true if the item is valid}
	 */
	// TODO: isValid / checkValid

	/**
	 * {@grouptitle Hierarchy Tests}
	 * 
	 * Checks if this item is above the specified item in the stacking order of
	 * the document.
	 * 
	 * Sample code:
	 * <code>
	 * var firstPath = new Path();
	 * var secondPath = new Path();
	 * print(secondPath.isAbove(firstPath)); // true
	 * </code>
	 * 
	 * @param item The item to check against
	 * @return {@true if it is above the specified item}
	 */
	// TODO: isAbove

	/**
	 * Checks if the item is below the specified item in the stacking order of
	 * the document.
	 * 
	 * Sample code:
	 * <code>
	 * var firstPath = new Path();
	 * var secondPath = new Path();
	 * print(firstPath.isBelow(secondPath)); // true
	 * </code>
	 * 
	 * @param item The item to check against
	 * @return {@true if it is below the specified item}
	 */
	// TODO: isBelow

	isParent: function(item) {
		return this.parent == item;
	},

	isChild: function(item) {
		return item.parent == this;
	},

	/**
	 * Checks if the item is contained within the specified item.
	 * 
	 * Sample code:
	 * <code>
	 * var group = new Group();
	 * var path = new Path();
	 * group.appendTop(path);
	 * print(path.isDescendant(group)); // true
	 * </code>
	 * 
	 * @param item The item to check against
	 * @return {@true if it is inside the specified item}
	 */
	isDescendant: function(item) {
		var parent = this;
		while (parent = parent.parent) {
			if (parent == item)
				return true;
		}
		return false;
	},

	/**
	 * Checks if the item is an ancestor of the specified item.
	 * 
	 * Sample code:
	 * <code>
	 * var group = new Group();
	 * var path = new Path();
	 * group.appendChild(path);
	 * print(group.isAncestor(path)); // true
	 * print(path.isAncestor(group)); // false
	 * </code>
	 * 
	 * @param item the item to check against
	 * @return {@true if the item is an ancestor of the specified item}
	 */
	isAncestor: function(item) {
		var parent = item;
		while (parent = parent.parent) {
			if (parent == this)
				return true;
		}
		return false;
	},

	/**
	 * Checks whether the item is grouped with the specified item.
	 * 
	 * @param item
	 * @return {@true if the items are grouped together}
	 */
	isGroupedWith: function(item) {
		var parent = this.parent;
		while (parent) {
			// Find group parents. Check for parent.parent, since don't want
			// top level layers, because they also inherit from Group
			if (parent.parent
				&& (parent instanceof Group || parent instanceof CompoundPath)
				&& item.isDescendant(parent))
					return true;
			// Keep walking up otherwise
			parent = parent.parent;
		}
		return false;
	},
	
	getStrokeBounds: function() {
		return this._getBounds(true);
	},
	
	getBounds: function() {
		return this._getBounds(false);
	},
	
	_getBounds: function(includeStroke) {
		var children = this.children;
		if (children && children.length) {
			var x1 = Infinity,
				x2 = -Infinity,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				if (child.visible) {
					var rect = includeStroke
							? child.getStrokeBounds()
							: child.getBounds();
					x1 = Math.min(rect.x, x1);
					y1 = Math.min(rect.y, y1);
					x2 = Math.max(rect.x + rect.width, x2);
					y2 = Math.max(rect.y + rect.height, y2);
				}
			}
			return includeStroke
				? Rectangle.create(x1, y1, x2 - x1, y2 - y1)
				: LinkedRectangle.create(this, 'setBounds',
						x1, y1, x2 - x1, y2 - y1);
		}
		// TODO: What to return if nothing is defined, e.g. empty Groups?
		// Scriptographer behaves weirdly then too.
		return new Rectangle();
	},

	setBounds: function(rect) {
		rect = Rectangle.read(arguments);
		var bounds = this.getBounds(),
			matrix = new Matrix(),
			center = rect.center;
		// Read this from bottom to top:
		// Translate to new center:
		matrix.translate(center);
		// Scale to new Size, if size changes and avoid divisions by 0:
		if (rect.width != bounds.width || rect.height != bounds.height) {
			matrix.scale(
					bounds.width != 0 ? rect.width / bounds.width : 1,
					bounds.height != 0 ? rect.height / bounds.height : 1);
		}
		// Translate to center:
		center = bounds.center;
		matrix.translate(-center.x, -center.y);
		// Now execute the transformation:
		this.transform(matrix);
	},

	/**
	 * The bounding rectangle of the item including stroke width.
	 */
	// TODO: getStrokeBounds

	/**
	 * The bounding rectangle of the item including stroke width and controls.
	 */
	// TODO: getControlBounds

	/**
	 * Rasterizes the item into a newly created Raster object. The item itself
	 * is not removed after rasterization.
	 * 
	 * @param resolution the resolution of the raster in dpi {@default 72}
	 * @return the newly created Raster item
	 */
	rasterize: function(resolution) {
		// TODO: why would we want to pass a size to rasterize? Seems to produce
		// weird results on Scriptographer. Also we can't use antialiasing, since
		// Canvas doesn't support it yet. Document colorMode is also out of the
		// question for now.
		var bounds = this.getStrokeBounds(),
			scale = (resolution || 72) / 72,
			canvas = CanvasProvider.getCanvas(bounds.getSize().multiply(scale)),
			ctx = canvas.getContext('2d'),
			matrix = new Matrix().scale(scale).translate(-bounds.x, -bounds.y);
		matrix.applyToContext(ctx);
		this.draw(ctx, {});
		var raster = new Raster(canvas);
		raster.setPosition(this.getPosition());
		raster.scale(1 / scale);
		return raster;
	},

	/**
	 * The item's position within the art board. This is the
	 * {@link Rectangle#getCenter()} of the {@link Item#getBounds()} rectangle.
	 * 
	 * Sample code:
	 * <code>
	 * // Create a circle at position { x: 10, y: 10 }
	 * var circle = new Path.Circle(new Point(10, 10), 10);
	 * 
	 * // Move the circle to { x: 20, y: 20 }
	 * circle.position = new Point(20, 20);
	 * 
	 * // Move the circle 10 points to the right
	 * circle.position += new Point(10, 0);
	 * print(circle.position); // { x: 30, y: 20 }
	 * </code>
	 */
	getPosition: function() {
		// Cache position value
		if (!this._position)
			this._position = this.getBounds().getCenter();
		return this._position.clone();
	},

	setPosition: function(point) {
		point = Point.read(arguments);
		if (point)
			this.translate(point.subtract(this.getPosition()));
	},

	/**
	 * @param flags: Array of any of the following: 'objects', 'children',
	 *     'fill-gradients', 'fill-patterns', 'stroke-patterns', 'lines'. 
	 *     Default: ['objects', 'children']
	 */
	transform: function(matrix, flags) {
		// TODO: Handle flags, add TransformFlag class and convert to bit mask
		// for quicker checking
		// TODO: Call transform on chidren only if 'children' flag is provided
		if (this._transform)
			this._transform(matrix, flags);
			// Transform position as well
		if (this._position)
			this._position = matrix._transformPoint(this._position);
		if (this.children) {
			for (var i = 0, l = this.children.length; i < l; i++) {
				var child = this.children[i];
				child.transform(matrix, flags);
			}
		}
		// PORT: Return 'this' in all chainable commands
		return this;
	},

/*
	_transform: function(matrix, flags) {
		// The code that performs the actual transformation of content,
		// if defined. Item itself does not define this.
	},
*/
	/**
	 * Translates (moves) the item by the given offset point.
	 * 
	 * Sample code:
	 * <code>
	 * // Create a circle at position { x: 10, y: 10 } 
	 * var circle = new Path.Circle(new Point(10, 10), 10);
	 * circle.translate(new Point(5, 10));
	 * print(circle.position); // {x: 15, y: 20}
	 * </code>
	 * 
	 * Alternatively you can also add to the {@link #getPosition()} of the item:
	 * <code>
	 * // Create a circle at position { x: 10, y: 10 } 
	 * var circle = new Path.Circle(new Point(10, 10), 10);
	 * circle.position += new Point(5, 10);
	 * print(circle.position); // {x: 15, y: 20}
	 * </code>
	 * 
	 * @param delta
	 */
	translate: function(delta) {
		var mx = new Matrix();
		return this.transform(mx.translate.apply(mx, arguments));
	},

	/**
	 * {@grouptitle Transform Functions}
	 * 
	 * Scales the item by the given values from its center point, or optionally
	 * by a supplied point.
	 * 
	 * @param sx
	 * @param sy
	 * @param center {@default the center point of the item}
	 * 
	 * @see Matrix#scale(double, double, Point center)
	 */
	scale: function(sx, sy /* | scale */, center) {
		// See Matrix#scale for explanation of this:
		if (arguments.length < 2 || typeof sy === 'object') {
			center = sy;
			sy = sx;
		}
		return this.transform(new Matrix().scale(sx, sy,
				center || this.getPosition()));
	},

	/**
	 * Rotates the item by a given angle around the given point.
	 * 
	 * Angles are oriented clockwise and measured in degrees by default. Read
	 * more about angle units and orientation in the description of the
	 * {@link com.scriptographer.ai.Point#getAngle()} property.
	 * 
	 * @param angle the rotation angle
	 * @see Matrix#rotate(double, Point)
	 */
	rotate: function(angle, center) {
		return this.transform(new Matrix().rotate(angle,
				center || this.getPosition()));
	},

	/**
	 * Shears the item with a given amount around its center point.
	 * 
	 * @param shx
	 * @param shy
	 * @see Matrix#shear(double, double)
	 */
	shear: function(shx, shy, center) {
		// TODO: Add support for center back to Scriptographer too!
		// See Matrix#scale for explanation of this:
		if (arguments.length < 2 || typeof sy === 'object') {
			center = shy;
			shy = shx;
		}
		return this.transform(new Matrix().shear(shx, shy,
				center || this.getPosition()));
	},

	/**
	 * The path style of the item.
	 * 
	 * Sample code:
	 * <code>
	 * var circle = new Path.Circle(new Point(10, 10), 10);
	 * circle.style = {
	 * 	fillColor: new RGBColor(1, 0, 0),
	 * 	strokeColor: new RGBColor(0, 1, 0),
	 * 	strokeWidth: 5
	 * };
	 * </code>
	 */
	getStyle: function() {
		return this._style;
	},

	setStyle: function(style) {
		this._style = PathStyle.create(this, style);
	},

	// TODO: toString

	statics: {
		drawSelectedBounds: function(bounds, ctx, matrix) {
			var top = bounds.y,
				bottom = bounds.y + bounds.height,
				left = bounds.x,
				right = bounds.x + bounds.width;
				coords = [ 
					left, top,
					right, top,
					right, bottom,
					left, bottom
				];
			if (matrix)
				matrix._transformCoordinates(coords, 0, coords, 0, 4);
			ctx.beginPath();
			for (var i = 0; i < 8; i++)
				ctx[i == 0 ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
			ctx.closePath();
			ctx.stroke();
			for (var i = 0; i < 8; i++) {
				ctx.beginPath();
				ctx.rect(coords[i] - 2, coords[++i] - 2, 4, 4);
				ctx.fill();
			}
		},

		// TODO: Implement DocumentView into the drawing
		// TODO: Optimize temporary canvas drawing to ignore parts that are
		// outside of the visible view.
		draw: function(item, ctx, param) {
			if (!item.visible || item.opacity == 0)
				return;

			var tempCanvas, parentCtx;
			// If the item has a blendMode or is defining an opacity, draw it on
			// a temporary canvas first and composite the canvas afterwards.
			// Paths with an opacity < 1 that both define a fillColor
			// and strokeColor also need to be drawn on a temporary canvas first,
			// since otherwise their stroke is drawn half transparent over their
			// fill.
			if (item.blendMode !== 'normal'
					|| item.opacity < 1
					&& !(item.segments && (!item.getFillColor()
							|| !item.getStrokeColor()))) {
				var bounds = item.getStrokeBounds() || item.getBounds();
				if (!bounds.width || !bounds.height)
					return;

				// Floor the offset and ceil the size, so we don't cut off any
				// antialiased pixels when drawing onto the temporary canvas.
				var itemOffset = bounds.getTopLeft().floor(),
					size = bounds.getSize().ceil().add(new Size(1, 1));
				tempCanvas = CanvasProvider.getCanvas(size);

				// Save the parent context, so we can draw onto it later
				parentCtx = ctx;

				// Set ctx to the context of the temporary canvas,
				// so we draw onto it, instead of the parentCtx
				ctx = tempCanvas.getContext('2d');
				ctx.save();

				// Translate the context so the topLeft of the item is at (0, 0)
				// on the temporary canvas.
				ctx.translate(-itemOffset.x, -itemOffset.y);
			}
			var savedOffset;
			if (itemOffset) {
				savedOffset = param.offset;
				param.offset = itemOffset;
			}
			item.draw(ctx, param);
			if (itemOffset)
				param.offset = savedOffset;

			// If we created a temporary canvas before, composite it onto the
			// parent canvas:
			if (tempCanvas) {

				// Restore the temporary canvas to its state before the
				// translation matrix was applied above.
				ctx.restore();

				// If the item has a blendMode, use BlendMode#process to
				// composite its canvas on the parentCanvas.
				if (item.blendMode !== 'normal') {
					// The pixel offset of the temporary canvas to the parent
					// canvas.
					var pixelOffset = itemOffset.subtract(param.offset);
					BlendMode.process(item.blendMode, ctx, parentCtx,
						item.opacity, pixelOffset);
				} else {
				// Otherwise we just need to set the globalAlpha before drawing
				// the temporary canvas on the parent canvas.
					parentCtx.save();
					parentCtx.globalAlpha = item.opacity;
					parentCtx.drawImage(tempCanvas,
							itemOffset.x, itemOffset.y);
					parentCtx.restore();
				}

				// Return the temporary canvas, so it can be reused
				CanvasProvider.returnCanvas(tempCanvas);
			}
		}
	}
}, new function() {

	function append(top) {
		return function(item) {
			item._removeFromParent();
			if (this.children) {
				Base.splice(this.children, [item], top ? undefined : 0, 0);
				item.parent = this;
				item._setDocument(this._document);
				return true;
			}
			return false;
		};
	}

	function move(above) {
		return function(item) {
			// first remove the item from its parent's children list
			if (item.parent && this._removeFromParent()) {
				Base.splice(item.parent.children, [this],
						item._index + (above ? 1 : -1), 0);
				this.parent = item.parent;
				this._setDocument(item._document);
				return true;
			}
			return false;
		};
	}

	return {
		/**
		 * {@grouptitle Hierarchy Operations}
		 * 
		 * Inserts the specified item as a child of the item by appending it to
		 * the list of children and moving it above all other children. You can
		 * use this function for groups, compound paths and layers.
		 * 
		 * Sample code:
		 * <code>
		 * var group = new Group();
		 * var path = new Path();
		 * group.appendTop(path);
		 * print(path.isDescendant(group)); // true
		 * </code>
		 * 
		 * @param item The item that will be appended as a child
		 */
		appendTop: append(true),

		/**
		 * Inserts the specified item as a child of this item by appending it to
		 * the list of children and moving it below all other children. You can
		 * use this function for groups, compound paths and layers.
		 * 
		 * Sample code:
		 * <code>
		 * var group = new Group();
		 * var path = new Path();
		 * group.appendBottom(path);
		 * print(path.isDescendant(group)); // true
		 * </code>
		 * 
		 * @param item The item that will be appended as a child
		 */
		appendBottom: append(false),

		/**
		 * A link to {@link #appendTop}
		 * 
		 * @deprecated use {@link #appendTop} or {@link #appendBottom} instead.
		 */
		appendChild: function(item) {
			return this.appendTop(item);
		},

		/**
		 * Moves this item above the specified item.
		 * 
		 * Sample code:
		 * <code>
		 * var firstPath = new Path();
		 * var secondPath = new Path();
		 * print(firstPath.isAbove(secondPath)); // false
		 * firstPath.moveAbove(secondPath);
		 * print(firstPath.isAbove(secondPath)); // true
		 * </code>
		 * 
		 * @param item The item above which it should be moved
		 * @return true if it was moved, false otherwise
		 */
		moveAbove: move(true),

		/**
		 * Moves the item below the specified item.
		 * 
		 * Sample code:
		 * <code>
		 * var firstPath = new Path();
		 * var secondPath = new Path();
		 * print(secondPath.isBelow(firstPath)); // false
		 * secondPath.moveBelow(firstPath);
		 * print(secondPath.isBelow(firstPath)); // true
		 * </code>
		 * 
		 * @param item the item below which it should be moved
		 * @return true if it was moved, false otherwise
		 */
		moveBelow: move(false)
	};
}, new function() {
	var sets = {
		down: {}, drag: {}, up: {}, move: {}
	};

	function removeAll(set) {
		for (var id in set) {
			var item = set[id];
			item.remove();
			for (var type in sets) {
				var other = sets[type];
				if (other != set && other[item.getId()])
					delete other[item.getId()];
			}
		}
	}

	function installHandler(name) {
		var handler = 'onMouse' + Base.capitalize(name);
		// Inject a onMouse handler that performs all the behind the scene magic
		// and calls the script's handler at the end, if defined.
		var func = paper.tool[handler];
		if (!func || !func._installed) {
			var hash = {};
			hash[handler] = function(event) {
				// Always clear the drag set on mouseup
				if (name === 'up')
					sets.drag = {};
				removeAll(sets[name]);
				sets[name] = {};
				// Call the script's overridden handler, if defined
				if (this.base)
					this.base(event);
			};
			paper.tool.inject(hash);
			// Only install this handler once, and mark it as installed,
			// to prevent repeated installing.
			paper.tool[handler]._installed = true;
		}
	}

	return Base.each(['down', 'drag', 'up', 'move'], function(name) {
		this['removeOn' + Base.capitalize(name)] = function() {
			var hash = {};
			hash[name] = true;
			return this.removeOn(hash);
		};
	}, {
		removeOn: function(obj) {
			for (var name in obj) {
				if (obj[name]) {
					sets[name][this.getId()] = this;
					// Since the drag set gets cleared in up, we need to make
					// sure it's installed too
					if (name === 'drag')
						installHandler('up');
					installHandler(name);
				}
			}
			return this;
		}
	});
}, new function() {
	var id = 0;
	return {
		beans: true,
		
		/**
		 * The unique id of the item.
		 */
		getId: function() {
			if (this._id === undefined)
				this._id = id++;
			return this._id;
		}
	};
});
