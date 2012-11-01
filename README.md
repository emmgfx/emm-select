emm-select
=========
_____________
View demo: http://viciana.me/emmselect/demo.html
_____________

Documentation
-------------

Sample HTML:

    <select class="b" filter="true">
        <option>Launchpad</option>
        <option>Google Chrome</option>
        <option>Coda 2</option>
        <option>Github for Mac</option>
        <option>Adobe Photoshop CS6</option>
    </select>

You can use the "filter" attribute, set to "true" like in the sample, to include a text input in your select to filter the options.

Sample jQuery:

    $('select.b').CSSSelect("Default title defined : )");

In this sample I used a default title. If the first option element of the select is in blank this text be used as the title.

And that's all.