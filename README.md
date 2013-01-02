Regions.js
==========

The first implementation for the CSS3-Regions in the real world.

That means : not just in an experimental prototypal and unstable browser.

What's the big deal ?
---------------------

If you find [this](http://labs.adobe.com/technologies/cssregions/) interesting, just try this script !

It requires [jQuery](http://jquery.com/) and [Lettering.js](https://github.com/davatron5000/Lettering.js) in order to work, but after that, that's easy !

But first : we aren't able to handle CSS3-Regions properties in your CSS (hey that's planned !). You will have to write a little bit of javascript (oh, you'll see that's really easy !).

How it works !
--------------

**This API is likely to change soon, because it's beta stuff !**

Add that in your page : 

    <script src="jquery.js"></script>
    <script src="lettering.jquery.js"></script>
    <script src="regions.jquery.js"></script>

After that, just add :

    <script>
    $(function(){ // When DOM is Loaded
        $("#article-flow").regions(".article-region");
    });
    </script>

So, somewhere in your HTML, you can put things like that :

    <div id="article-flow">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae neque id tellus congue sollicitudin sit amet eget nisi. Morbi gravida vehicula varius. Morbi sapien quam, sollicitudin nec vehicula ut, luctus a magna. Sed id ultricies libero. Etiam sagittis, ligula in luctus aliquet, libero urna sodales purus, at suscipit orci est at libero. Nulla cursus pharetra ligula et ultrices.</p>
        <p>Donec eu odio sed urna consectetur lacinia. Maecenas quam dolor, vestibulum nec condimentum vel, egestas eu lectus. Quisque sit amet quam non eros pulvinar tempus eget in erat. Suspendisse sed sodales justo. Nunc hendrerit cursus tortor, eget accumsan urna sollicitudin sed.</p>
    </div>
    <div class="article-region" id="article-region-1" style="width: 200px; height: 100px;"></div>
    <div class="article-region" id="article-region-2" style="width: 50%; height: 100px;"></div>
    <div class="article-region" id="article-region-3"></div>

Your weird layout is now ready to go !

Syntax
------

You can also pass a jQuery Object or a list of jQuery Objects / jQuery Selectorstring to the function :

    $("#content-source-element").regions($(".content-target-elements"));

    // or

    $("#content-source-element").regions(["#article-region-1", "#article-region-2", "#article-region-3"]);

    // or

    $("#content-source-element").regions([$("#article-region-1"), $("#article-region-2"), $("#article-region-3")]);

    // even mixed

    $("#content-source-element").regions([$("#article-region-1"), "#article-region-2", $("#article-region-3")]);


If you want to use CSS3-Regions (without this polyfill) in a supported browser, you should consider using [Modernizr](http://www.modernizr.com/). A feature detector is present in `feature-detects/cssregions.js`.
**Note that there is currently (4th of april 2012) no browser supporting css-regions, even Chrome [has dropped the support](https://bugs.webkit.org/show_bug.cgi?id=78525#c0)**
