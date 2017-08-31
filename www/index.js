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
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        var self = this;

        //显示设备基本信息
        var html = "";
        for (var key in device) {
            !(device[key] instanceof Function) && (html += (key + ":" + device[key] + "<br/>"));
        }
        document.getElementById("device_info").innerHTML = html;

        //拍照
        document.getElementById("camera").onclick = function () {
            self.handle_avatar(Camera.PictureSourceType.CAMERA);
        };

        //相册
        document.getElementById("photo").onclick = function () {
            self.handle_avatar(Camera.PictureSourceType.PHOTOLIBRARY);
        };

        //定位
        baidumap_location.getCurrentPosition(function (result) {
            var html = "country:" + result.country + "<br/>" +
                "province:" + result.province + "<br/>" +
                "city:" + result.city + "<br/>" +
                "district:" + result.district + "<br/>" +
                "addr:" + result.addr + "<br/>" +
                "locationDescribe:" + result.locationDescribe;
            document.getElementById("position_info").innerHTML = html;

            var map = new BMap.Map("allmap");
            var point = new BMap.Point(result.longitude, result.latitude);
            map.centerAndZoom(point, 15);
            var new_point = new BMap.Point(result.longitude, result.latitude);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);
        }, function (error) {

        });


    },

    //拍照、相册处理
    handle_avatar: function (sourceType) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetHeight: 200,
            targetWidth: 200,
            sourceType: sourceType
        });
        function onSuccess(imageData) {
            var image = document.getElementById('avatar');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {

        }
    }
};

app.initialize();