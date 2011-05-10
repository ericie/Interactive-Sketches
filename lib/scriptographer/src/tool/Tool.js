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

var Tool = this.Tool = ToolHandler.extend(new function() {
	function viewToArtwork(event, document) {
		// TODO: always the active view?
		return document.activeView.viewToArtwork(DomEvent.getOffset(event));
	};

	return {
		beans: true,

		initialize: function(handlers, doc) {
			this.base(handlers);
			// Create events once, so they can be removed easily too.
			var that = this, curPoint;
			var dragging = false;
			this.events = {
				mousedown: function(event) {
					curPoint = viewToArtwork(event, that._document);
					that.onHandleEvent('mousedown', curPoint, event);
					if (that.onMouseDown)
						that._document.redraw();
					if (that.eventInterval != null) {
						this.timer = setInterval(that.events.mousemove,
								that.eventInterval);
					}
					dragging = true;
				},

				mousemove: function(event) {
					// If the event was triggered by a touch screen device,
					// prevent the default behaviour, as it will otherwise
					// scroll the page:
					if (event && event.targetTouches)
						event.preventDefault();
					var point = event && viewToArtwork(event, that._document);
					// If there is only an onMouseMove handler, call it when
					// the user is dragging
					var onlyMove = !!(!that.onMouseDrag && that.onMouseMove);
					if (dragging && !onlyMove) {
						curPoint = point || curPoint;
						if (curPoint)
							that.onHandleEvent('mousedrag', curPoint, event);
					} else if (!dragging || onlyMove) {
						that.onHandleEvent('mousemove', point, event);
					}
					if (that.onMouseMove || that.onMouseDrag)
						that._document.redraw();
				},

				mouseup: function(event) {
					if (dragging) {
						curPoint = null;
						if (that.eventInterval != null)
							clearInterval(this.timer);
						that.onHandleEvent('mouseup',
								viewToArtwork(event, that._document), event);
						if (that.onMouseUp)
							that._document.redraw();
						dragging = false;
					}
				},

				touchmove: function(event) {
					that.events.mousemove(event);
				},

				touchstart: function(event) {
					that.events.mousedown(event);
				},

				touchend: function(event) {
					that.events.mouseup(event);
				}
			};

			// Remove old events first.
			if (this._document)
				DomEvent.remove(this._document.canvas, this.events);
			this._document = doc;
			DomEvent.add(doc.canvas, this.events);
		},

		getDocument: function() {
			return this._document;
		},

		/**
		 * The fixed time delay between each call to the {@link #onMouseDrag}
		 * event. Setting this to an interval means the {@link #onMouseDrag}
		 * event is called repeatedly after the initial {@link #onMouseDown}
		 * until the user releases the mouse.
		 * 
		 * Sample code:
		 * <code>
		 * // Fire the onMouseDrag event once a second,
		 * // while the mouse button is down
		 * tool.eventInterval = 1000;
		 * </code>
		 * 
		 * @return the interval time in milliseconds
		 */
		eventInterval: null
	};
});
