 let player, settings;

 function onYouTubeIframeAPIReady() {
     settings = getURLParams();
     player = new YT.Player('player-div', {
         videoId: settings['v'],
         playerVars: {
             start: settings['start'],
             autoplay: 0,
             controls: 0,
             showinfo: 0,
             allowFullScreen: 0,
             iv_load_policy: 3,
             allowFullScreen: 0,
         },
         events: {
             onReady: function(e) {
                 if (settings['m'] === '1') e.target.mute();
                 setInterval(() => {
                     if (Math.floor(player.getCurrentTime()) >= settings['end']) {
                         player.seekTo(settings['start'], true);
                     }
                     if(settings['shape'] !== '-1') {
                     	if (Math.floor(player.getCurrentTime()) >= parseInt(settings['ss']) && !(!!document.getElementById('cover-shape'))) {
                     		placeShape();
                     	}
                     	if(Math.floor(player.getCurrentTime()) >= parseInt(settings['es']) && (!!document.getElementById('cover-shape'))) {
                     		document.body.removeChild(document.getElementById('cover-shape'));
                     	}
                     }
                 }, 1000);
             }
         }
     });
 }

 function getVideoID() {
     return window.location.search.match(/id=.*/)[0].split('=')[1];
 }

 function placeShape() {
     if (settings['s'] !== '-1') {
         let player_positions = document.querySelector('#player-div').getBoundingClientRect();
         let shape = document.createElement('DIV');
         shape.setAttribute('id', 'cover-shape');
         shape.setAttribute('style', `position:absolute;background:grey;z-index:-1;width:${settings['w']}px;height:${settings['h']}px;left:${parseInt(settings['x']) + player_positions['left']}px;top:${parseInt(settings['y']) + player_positions['top']}px;`);
         document.getElementById('player-div').appendChild(shape);
     }
 }

 function getURLParams() {
     let params = {};
     for (let param of window.location.search.replace('?', '').split('&')) {
         params[param.split('=')[0]] = param.split('=')[1];
     }
     if ('id' in params) {
         return videos[params['id']];
     }
     return params;
 }