/**	 Cycle Philly, Copyright 2014 Code for Philly
 *

 * 	 @author Lloyd Emelle
 *
 *   This file is part of CyclePhilly.
 *
 *   CyclePhilly is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   CyclePhilly is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with CycleTracks.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.phillyopen.mytracks.cyclephilly;

import java.util.Arrays;
import java.lang.String;

/**
 * This is an enumeration to represent different wind directions
 *
 * This encapsulates the wind direction and any extra information about it.
 *
 * @author Lloyd Emelle
 * @since August 26th 2014
 */
public enum WindDirection {

    N("N", 0, 0),

    NE("NE", 0, 90),

    E("E", 90, 90),

    SE("SE", 90, 180),

    S("S", 180, 180),

    SW("SW", 180, 270),

    W("W", 270, 270),

    NW("NW", 270, 360);

    /**
     * The maximum degrees.
     */
    public static final int MAX_DEGREE = 360;

    /**
     * The cardinal direction of wind.
     */
    public final String cardinal;

    /**
     * The start of degree of wind direction.
     */
    public final double startDegree;

    /**
     * The end of degree of wind direction.
     */
    public final double endDegree;



    /**
     * Get the direction contained in a given degree range
     *
     * @param degree The degree for which to get direction.
     * @return cordinal direction
     */
    public static WindDirection[] getCordinalDirection(final int degree) {
        if (degree >= 0 && degree <= MAX_DEGREE) {
            // Get Direction
            final int offset = degree;
            return Arrays.copyOfRange(values(), offset, offset);
        }
        else {
            throw new IndexOutOfBoundsException(String.format("The degree: %d is outside the valid range!", degree));
        }
    }



    /**
     * Wind Direction.
     *
     * @param cardinal The cardinal Direction.
     * @param startDegree degree range .
     * @param endDegree degree range.
     */
    private WindDirection(String cardinal, int startDegree, int endDegree) {
        this.cardinal = cardinal;
        this.startDegree = startDegree;
        this.endDegree = endDegree;
    }

    /**
     * Create a String representation of the wind direction.
     *
     * @return A String representation of the wind direction.
     */
    public String toString() {
        return cardinal;
    }

}