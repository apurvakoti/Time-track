/*
 * Copyright 2013 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 document.addEventListener('DOMContentLoaded', function () {
     var backPage = chrome.extension.getBackgroundPage();
     //debugger;
     document.getElementById('textBox').innerHTML = "Time spent on " + backPage.url +": " + FormatTime(backPage.timeElapsed);


 });

 function ResetTime() {
  chrome.extension.getBackgroundPage().reset();
  location.reload();
}

function FormatTime(time) {
    var seconds = Math.floor(time / 1000);
    var mins = Math.floor(seconds/60);
    var remainingSeconds = seconds % 60;
    return "" + mins + "m, " + remainingSeconds + "s";
}

document.getElementById('resetButton').addEventListener('click', ResetTime);
