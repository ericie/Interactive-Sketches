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

var GradientColor = this.GradientColor = Color.extend({
	beans: true,

	initialize: function(gradient, origin, destination, hilite) {
		this.gradient = gradient || new Gradient();
		this.setOrigin(origin);
		this.setDestination(destination);
		if (hilite)
			this.setHilite(hilite);
	},

	getOrigin: function() {
		return this._origin;
	},

	setOrigin: function(origin) {
		// PORT: add clone to Scriptographer
		origin = Point.read(arguments).clone();
		this._origin = origin;
		if (this._destination)
			this._radius = this._destination.getDistance(this._origin);
		return this;
	},

	getDestination: function() {
		return this._destination;
	},

	setDestination: function(destination) {
		// PORT: add clone to Scriptographer
		destination = Point.read(arguments).clone();
		this._destination = destination;
		this._radius = this._destination.getDistance(this._origin);
		return this;
	},

	getHilite: function() {
		return this._hilite;
	},

	setHilite: function(hilite) {
		// PORT: add clone to Scriptographer
		hilite = Point.read(arguments).clone();
		var vector = hilite.subtract(this._origin);
		if (vector.getLength() > this._radius) {
			this._hilite = this._origin.add(vector.normalize(
					this._radius - 0.1));
		} else {
			this._hilite = hilite;
		}
		return this;
	},

	getCanvasStyle: function(ctx) {
		var gradient;
		if (this.gradient.type === 'linear') {
			gradient = ctx.createLinearGradient(this._origin.x, this._origin.y,
				this.destination.x, this.destination.y);
		} else {
			var origin = this._hilite || this._origin;
			gradient = ctx.createRadialGradient(origin.x, origin.y,
				0, this._origin.x, this._origin.y, this._radius);
		}
		for (var i = 0, l = this.gradient._stops.length; i < l; i++) {
			var stop = this.gradient._stops[i];
			gradient.addColorStop(stop._rampPoint, stop.color.toCssString());
		}
		return gradient;
	},
	
	/**
	 * Checks if the component color values of the color are the
	 * same as those of the supplied one.
	 * 
	 * @param obj the GrayColor to compare with
	 * @return {@true if the GrayColor is the same}
	 */
	equals: function(color) {
		if (color && color._colorType === this._colorType) {
			return this.gradient.equals(color.gradient)
					&& this._origin.equals(color._origin)
					&& this._destination.equals(color._destination);
		}
		return false;
	},
	
	transform: function(matrix) {
		var origin = this._origin,
			destination = this._destination,
			hilite = this._hilite,
			coords = [ origin.x, origin.y, destination.x, destination.y];
		if (hilite) {
			coords[4] = hilite.x;
			coords[5] = hilite.y;
		}
		matrix._transformCoordinates(coords, 0, coords, 0,
				this._hilite ? 3 : 2);
		origin.x = coords[0];
		origin.y = coords[1];
		destination.x = coords[2];
		destination.y = coords[3];
		this._radius = destination.getDistance(origin);
		if (hilite) {
			hilite.x = coords[4];
			hilite.y = coords[5];
		}
	}
});

