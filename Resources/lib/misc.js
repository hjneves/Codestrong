/**
 * This file is part of DrupalCon Mobile.
 *
 * DrupalCon Mobile is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DrupalCon Mobile is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DrupalCon Mobile.  If not, see <http://www.gnu.org/licenses/>.
 */

// Using the parsing method shown https://gist.github.com/819929
/**
 * Define our parser class. It takes in some text, and then you can call "linkifyURLs", or one of the other methods,
 * and then call "getHTML" to get the fully parsed text back as HTML!
 * @param text that you want parsed
 */
function twitterParser(text) {

  var html = text;

  var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  var hashTagRegex = /#([^ ]+)/gi;
  var atTagRegex = /\@([a-z]+)/ig;

  this.linkifyURLs = function() {
    html = html.replace(urlRegex, '<a href="$1">$1</a>');
    // html = html.replace(urlRegex, '<a onclick="Ti.App.fireEvent(\'openURL\', { url: \'$1\' });">$1</a>');
  };
  this.linkifyHashTags = function() {
    html = html.replace(hashTagRegex, '<a href="http://twitter.com/#!/search?q=%23$1">#$1</a>');
  };
  this.linkifyAtTags = function() {
    html = html.replace(atTagRegex, '<a href="http://mobile.twitter.com/$1">@$1</a>');
  };

  this.getHTML = function() {
    return html;
  };

}


/*
 * Clean up some of the special characters we are running into.
 */
function cleanSpecialChars(str) {
  // Because otherwise the code below would explode.
  if (str == null) {
    return '';
  }

  if (typeof str === 'string') {
    return  str
      .replace(/&quot;/g,'"')
      .replace(/\&amp\;/g,"&")
      .replace(/&lt;/g,"<")
      .replace(/&gt;/g,">")
      .replace(/&#039;/g, "'");
  }

  return '';
}
