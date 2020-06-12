// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<TimeRange> times = new ArrayList<TimeRange>();
    int start_of_timeslot = TimeRange.START_OF_DAY;
    int end_of_timeslot = TimeRange.END_OF_DAY;
    TimeRange middle_current_timeslot;
    TimeRange middle_past_timeslot = TimeRange.fromStartDuration(TimeRange.END_OF_DAY, 0);
    for (Event event : events) {
        // Loop through events updating middle and beginning times
        // Think of it as a line .----------. each time an event is added 
        // We add a new dot and update the beginnign and middle pointers
        // .-----.-----.
        // Start of timeslot is the beginning of an avaliable period
        // End of timeslot is the latest possible period something can run to
        // Middle current timeslot is the current event we are checking to add in points to our timeline
        // Middle past timeslot was the previous event we checked and added to our timeline
        middle_current_timeslot = event.getWhen();
        // Check if the two events are overlapped
        if (start_of_timeslot > middle_current_timeslot.start()) {
            // If they are overlapped then make the next avaliable slot
            // The time of whichever ends later
            if (middle_current_timeslot.end() > middle_past_timeslot.end()) {
                start_of_timeslot = middle_current_timeslot.end();
            } else {
                start_of_timeslot = middle_past_timeslot.end();
            }
        // If they aren't overlapped then just update middle and beginning point
        } else {
            // Make sure the request and the meetings Attendees are the same
            if (request.getAttendees().containsAll(event.getAttendees()) == false) {
                return Arrays.asList(TimeRange.WHOLE_DAY);
            }
            TimeRange new_timeslot = TimeRange.fromStartEnd(start_of_timeslot, middle_current_timeslot.start(), false);
            if (new_timeslot.duration() >= request.getDuration()) {
                times.add(new_timeslot);
            }
            start_of_timeslot = middle_current_timeslot.end();
        }
        middle_past_timeslot = event.getWhen();
    }
    // Get the final interval from ending of last meeting to end of day
    TimeRange final_time = TimeRange.fromStartEnd(start_of_timeslot, end_of_timeslot, true);
    // Make sure the intervals are more than 0 minutes
    if (final_time.duration() > 0) {
        times.add(final_time);
    }
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) {
        return Arrays.asList();
    }
    return times;
  }
}
