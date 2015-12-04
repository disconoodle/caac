/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		initFeatured();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('home');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var receivedElement = parentElement.querySelector('.top-header');

        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
    function ValidateEmail(fld)   
    {  
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
		if((fld.value.length > 0) && fld.value.match(mailformat))  
		{  
		fld.focus();  
		return true;  
		}  
		else  
		{  
		alert("You have entered an invalid email address!");  
		fld.focus(); 		
		return false;  
		}
	}  

$('form').submit(function(){
    var postData = $(this).serialize();
 
    $.ajax({
        type: 'POST',
        data: postData,
        url: 'http://www.caacarts.org/wapp/caac/_admin/_bin/post_subscriber.php',
        success: function(data){
            console.log(data);
            if (data.indexOf("SEV-ERR:") >= 0)
            alert('There was an error adding your email: '+data.substr(data.indexOf("SEV-ERR:")+8));
			else
			alert('Your email was successfully added');
        },
        error: function(){
            console.log(data);
            alert('There was an error connecting to server, try again later');
        }
    });
 
    return false;
});

function initFeatured() {
	var xmlhttp = new XMLHttpRequest(); 
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//alert("response string:  "+xmlhttp.responseText);
			var xmlDoc = xmlhttp.responseXML;
			if (!xmlDoc) {alert("Unrecognised response"); return;}
			var x = xmlDoc.getElementsByTagName("image");
			for (i = 0; i < x.length; i++) {
				document.getElementById("featured").src = x[i].childNodes[0].nodeValue;
			}
		}
	};
	xmlhttp.open("GET", "http://www.caacarts.org/wapp/caac/_admin/_bin/get_featured.php", true);
	xmlhttp.setRequestHeader("Content-Type", "text/xml");
	xmlhttp.send();
}