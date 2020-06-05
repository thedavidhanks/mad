//for compressing and decompressing lat,long points into and encoded string.
//Reference https://developer.mapquest.com/documentation/common/encode-decode/

export const decompress = (encoded, precision) => {
   precision = Math.pow(10, -precision);
   var len = encoded.length, index=0, lat=0, lng = 0, array = [];
   while (index < len) {
      var b, shift = 0, result = 0;
      do {
         b = encoded.charCodeAt(index++) - 63;
         result |= (b & 0x1f) << shift;
         shift += 5;
      } while (b >= 0x20);
      var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
         b = encoded.charCodeAt(index++) - 63;
         result |= (b & 0x1f) << shift;
         shift += 5;
      } while (b >= 0x20);
      var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      array.push(lat * precision);
      array.push(lng * precision);
   }
   return array;
};

export const compress = (points, precision) => {
   var oldLat = 0, oldLng = 0, len = points.length, index = 0;
   var encoded = '';
   precision = Math.pow(10, precision);
   while (index < len) {
      //  Round to N decimal places
      var lat = Math.round(points[index++] * precision);
      var lng = Math.round(points[index++] * precision);

      //  Encode the differences between the points
      encoded += encodeNumber(lat - oldLat);
      encoded += encodeNumber(lng - oldLng);

      oldLat = lat;
      oldLng = lng;
   }
   return encoded;
};

function encodeNumber(num) {
   num = num << 1;
   if (num < 0) {
      num = ~(num);
   }
   var encoded = '';
   while (num >= 0x20) {
      encoded += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
      num >>= 5;
   }
   encoded += String.fromCharCode(num + 63);
   return encoded;
}