fetch('https://api.myjson.com/bins/1geede')
.then(  res   => res.json()) 
.then(  data  => {  // Set Title Date
                    seTitleDate ( weekDay(_d(data.data.conversationDate).getDay())+', '+
                                  monthNames(_d(data.data.conversationDate).getMonth()) +' '+
                                  _d(data.data.conversationDate).getDate()+', '+
                                  ((_d(data.data.conversationDate).getYear()) + 1900) 
                                )
                    // Load Chat Data
                    data.data.messages.forEach ( (el,index) => {
                      if ( el.username == 'Mygel van Trabel' ) {
                        setLeftMessage( el.focused,
                                        el.image,
                                        el.message,
                                        getClockTime(el.timestamp),
                                        el.username,
                                        index
                                      );
                      } else {
                        setRightMessage( el.focused,
                                         el.image,
                                         el.message,
                                         getClockTime(el.timestamp),
                                         el.username,
                                         index
                                        );
                      }
                    });
                 })
.catch( error => console.error(error));


function seTitleDate (date) {
  _('conversationDate').innerHTML = date;
}

function setLeftMessage(focused,image,message,timestamp,username) {
  var style = focused? 'background-color: #ffff;'+ 
                       'box-shadow:0 4px 8px 0 #f1f1f1, 0 6px 20px 0 #f1f1f1;' : 
                       'background-color: #f1f1f1;';
  _('content').innerHTML += 
  '<div class="flex-container-chat-content-l">'+
  '  <div style="flex-grow: 1">'+
  '    <img src="'+image+'" class="left" alt="Avatar">'+
  '  </div>'+
  '  <div style="flex-grow: 8">'+
  '    <div class="icon_wrapper_l">'+
  '      <span class="chat-arrow-l"></span> '+
  '    </div>'+
  '    <div class="message_body" style="'+style+'" >'+
  '      <p>'+message+'</p>'+
  '      <span class="time-left red"><b>'+username+'</b></span>'+
  '      <span class="time-left"> '+
  '        <div class="clockIcon">'+
  '          <img src="assets/clock.png" class="timeIcon" alt="Avatar">'+
  '             </div><span class="time">'+timestamp+'</span>'+
  '      </span>'+
  '    </div>'+
  '  </div>'+
  '</div>';
}

function setRightMessage (focused,image,message,timestamp,username) {
  var style = focused? 'background-color: #ffff;'+ 
                       'box-shadow:0 4px 8px 0 #f1f1f1, 0 6px 20px 0 #f1f1f1;' : 
                       'background-color: #f1f1f1;';
  _('content').innerHTML +=
  '<div class="flex-container-chat-content-r">'+
  '  <div style="flex-grow: 8">'+
  '    <div class="message_body" style="'+style+'"" >'+
  '      <p>'+message+'</p>'+
  '      <span class="time-left blue"><b>'+username+'</b></span>'+
  '      <span class="time-left"> '+
  '        <div class="clockIcon">'+
  '           <img src="assets/clock.png" class="timeIcon" alt="Avatar">'+
  '              </div><span class="time">'+timestamp+'</span>'+
  '      </span>'+
  '    </div>'+
  '    <div class="icon_wrapper_r">'+
  '      <span class="chat-arrow-r"></span> '+
  '    </div>'+
  '  </div>'+
  '  <div style="flex-grow: 1">'+
  '    <img src="'+image+'" class="right" alt="Avatar">'+
  '  </div>'+
  '</div>';
}

function getClockTime(ol){
  var now    = _d(ol);
  var hour   = now.getHours();
  var minute = now.getMinutes();
  var ap = "AM";
  if (hour   > 11) { ap = "PM";             }
  if (hour   > 12) { hour = hour - 12;      }
  if (hour   == 0) { hour = 12;             }
  if (hour   < 10) { hour   = "0" + hour;   }
  if (minute < 10) { minute = "0" + minute; }
  var timeString = hour + ':' + minute + " " + ap;
  return timeString;
}

function monthNames(ol) {
  const monthNames = ['January', 'February', 'March', 
                      'April', 'May', 'June','July', 
                      'August', 'September', 'October', 
                      'November', 'December'];
  return monthNames[ol];
}

function weekDay(ol) {
  var weekday = new Array(7);
  weekday[0] = 'Sunday';
  weekday[1] = 'Monday';
  weekday[2] = 'Tuesday';
  weekday[3] = 'Wednesday';
  weekday[4] = 'Thursday';
  weekday[5] = 'Friday';
  weekday[6] = 'Saturday';
  return  weekday[ol];
}

function _(ol) {
  return document.getElementById(ol);
}

function _d(ol) {
  return new Date(ol);
}

