# A very simple Javascript slideshow for Flickr.

Flickrshow is a very simple Javascript slideshow for Flickr. It doesn’t require any web-development expertise, any particular Javascript frameworks, (although it works with all of them), or any hosted web space. It works in all modern web browsers, and Internet Explorer 6.

## Installation & Usage

Flickrshow can display the latest images uploaded to Flickr in less than 40 characters. To add a slideshow to your page just include the script itself and add the code shown in the example below. You can specify the element you wish to contain the slideshow by providing the element ID or the element as a Javascript object.

### Example 1. Displaying recent images with Flickrshow

    <div id="robin">
        <p>Please enable Javascript to view this slideshow</p>
    </div>
    ...
    <script src="flickrshow-7.2.min.js"></script>
    <script>
        var robin = new flickrshow('robin');
    </script>
    
In order to customise your slideshow to display your own images you must supply additional settings to the slideshow. The settings used in the slideshow above are shown in the example below.

### Example 2. Supplying options to Flickrshow

    <script>
    var robin = new flickrshow('robin', {
      autoplay:true,
      interval:5000,
      license:null,
      page:1,
      per_page:10,
      tags:'nikonfm2',
      user:'85173533@N00'
    });
    </script>
    
Although Flickrshow does not require JQuery, if JQuery is detected Flickrshow will add a convenient wrapper function allowing you to use Flickrshow as you would any other JQuery plugin.

### Example 3. Alternate usage of Flickrshow with jQuery.

    <script>
    var robin = $('#robin').flickrshow({
      autoplay:true,
      interval:5000,
      page:1,
      per_page:10,
      tags:'nikonfm2',
      user:'85173533@N00'
    });
    </script>
    
## Available Options & Methods

As shown in the example pages above, there are a large number of ways in which Flickrshow can be configured. The following table lists the settings that can be passed to Flickrshow, their default values and a brief description. All settings should be passed as shown in Example 2 above.

<table>
  <thead>
    <tr>
      <th class="key">Key</th>
      <th class="default-value">Default Value</th>
      <th class="type">Type</th>
      <th class="description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>autoplay</th>
      <td>false</td>
      <td>boolean</td>
      <td>Plays the slideshow as soon as it has loaded all images.</td>
    </tr>
    <tr>
      <th>gallery</th>
      <td>&nbsp;</td>
      <td>string</td>
      <td>The ID of the <em>gallery</em> you wish to display. You may need to use the <a href="http://www.flickr.com/services/api/">Flickr API</a> to retrieve this variable.</td>
    </tr>
    <tr>
      <th>group</th>
      <td>&nbsp;</td>
      <td>string</td>
      <td>The ID of the <em>group</em> you wish to display. You may need to use the <a href="http://www.flickr.com/services/api/">Flickr API</a> to retrieve this variable.</td>
    </tr>
    <tr>
      <th>hide_buttons</th>
      <td>false</td>
      <td>boolean</td>
      <td>Prevent the button panel from displaying when you hover over or click on the slideshow.</td>
    </tr>
    <tr>
      <th>interval</th>
      <td>3000</td>
      <td>integer</td>
      <td>The number of milliseconds delay between moving the images when playing the slideshow.</td>
    </tr>
    <tr>
      <th>license</th>
      <td>"1,2,3,4,5,6,7"</td>
      <td>string</td>
      <td>A comma separated list of the allowable licenses within your slideshow. If set to null, no license restrictions will be set so please ensure you have permission to display the images. See the <a href="http://www.flickr.com/services/api/">Flickr API</a> for more information on license codes.</td>
    </tr>
    <tr>
      <th>onLoad</th>
      <td>&nbsp;</td>
      <td>function</td>
      <td>A callback function triggered when the slideshow has loaded all images.</td>
    </tr>
    <tr>
      <th>onMove</th>
      <td>&nbsp;</td>
      <td>function</td>
      <td>A callback function triggered when the left or right buttons are pressed. Passes the IMG element currently being displayed as the first parameter.</td>
    </tr>
    <tr>
     <th>onPlay</th>
     <td>&nbsp;</td>
     <td>function</td>
     <td>A callback function triggered when the play button is pressed.</td>
    </tr>
    <tr>
      <th>onPause</th>
      <td>&nbsp;</td>
      <td>function</td>
      <td>A callback function triggered when the stop button is pressed.</td>
    </tr>
    <tr>
      <th>page</th>
      <td>1</td>
      <td>integer</td>
      <td>The page of images you wish to display. See the <a href="http://www.flickr.com/services/api/">Flickr API</a> for more details.</td>
    </tr>
    <tr>
      <th>person</th>
      <td>&nbsp;</td>
      <td>string</td>
      <td>The ID of the <em>person</em> you wish to display photos of. You may need to use the <a href="http://www.flickr.com/services/api/">Flickr API</a> to retrieve this variable.</td>
    </tr>
    <tr>
      <th>per_page</th>
      <td>50</td>
      <td>integer</td>
      <td>The number of images you wish to display in the slideshow. The <a href="http://www.flickr.com/services/api/">Flickr API</a> maximum is 500 although a maximum of 100 is recommended.</td>
    </tr>
    <tr>
      <th>set</th>
      <td>&nbsp;</td>
      <td>string</td>
      <td>The ID of the <em>set</em> you wish to display. You may need to use the <a href="http://www.flickr.com/services/api/">Flickr API</a> to retrieve this variable.</td>
    </tr>
    <tr>
      <th>tags</th>
      <td>&nbsp;</td>
      <td>string</td>
      <td>A comma-seperated list of <em>tags</em> you wish to search by. Can be used in conjunction with <strong>user</strong>.</td>
    </tr>
    <tr>
      <th>user</th>
      <td>&nbsp;</td>
      <td>integer</td>
      <td>The ID of the <em>user</em> whose photos you wish to display. Can be used in conjunction with <strong>tags</strong>.</td>
    </tr>
  </tbody>
</table>

## Support & Licence

Flickrshow is no longer being developed and so support is no longer available. Flickrshow is licenced under the GNU licence as included in the Github repository.