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
    int beginning = TimeRange.START_OF_DAY;
    int end = TimeRange.END_OF_DAY;
    TimeRange middle_current;
    TimeRange middle_past = TimeRange.fromStartDuration(TimeRange.END_OF_DAY, 0);
    //check for primary edge cases of duration longer than one day
    if (request.getDuration() > (24*60)){
        return Arrays.asList();
    //check for primary edge cases of empty attendee list
    } else if (request.getAttendees().isEmpty()) {
        return Arrays.asList(TimeRange.WHOLE_DAY);
    //loop through events updating middle and beginning times
    //think of it as a line .----------. each time an event is added 
    //we add a new dot and update the beginnign and middle pointers
    // .-----.-----.
    } else {
        for (Event event : events) {
            middle_current = event.getWhen();
            //check if the two events are overlapped
            if (beginning > middle_current.start()) {
                //if they are overlapped then make the next avaliable slot
                //the time of whichever ends later
                if (middle_current.end() > middle_past.end()) {
                    beginning = middle_current.end();
                } else {
                    beginning = middle_past.end();
                }
            //if they aren't overlapped then just update middle and beginning point
            } else {
                //make sure the request and the meetings Attendees are the same
                if (request.getAttendees().containsAll(event.getAttendees()) == false) {
                    return Arrays.asList(TimeRange.WHOLE_DAY);
                }
                TimeRange new_time = TimeRange.fromStartEnd(beginning, middle_current.start(), false);
                if (new_time.duration() >= request.getDuration()) {
                    times.add(new_time);
                }
                beginning = middle_current.end();
            }
            middle_past = event.getWhen();
        }
        //get the final interval from ending of last meeting to end of day
        TimeRange final_time = TimeRange.fromStartEnd(beginning, end, true);
        //make sure the intervals are more than 0 minutes
        if (final_time.duration() > 0) {
            times.add(final_time);
        }
        return times;
    }
  }
}
