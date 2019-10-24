console.log("-------------------------- DISPLAY ACTIVE ------------------------------");
var bootstrap_properties = {
    column_name: "col",
    column_auto_property_name: "auto",
    column_grid_number: 12,
    sizes: ["xs", "sm", "md", "lg", "xl"],
    // first size is assume to be the default size
    breaks: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1140
    }
};
var detectWindowSize = () => {
    var detected_sizes = [ bootstrap_properties.sizes[0] ];
    var view_width = $(window).width();
    bootstrap_properties.sizes.forEach( (value, index) => {
        if(index == 0){
            return;
        }
        else{
            if(bootstrap_properties.breaks[value] <= view_width){
                detected_sizes.push(value);
            }
        }
    });
    return detected_sizes;
};
var applyTextIndication = (text, template, elem, selector) => {
    var output = $(template).get(0).outerHTML.replace("??text??", text);
    if(typeof elem !== 'undefined'){
        var found = false;
        if(typeof selector !== 'undefined'){
            var finder = $(elem).find(selector);
            if(finder.length > 0){
                found = true;
                finder.html(text);
            }
        }

        if(!found){
            $(elem).append($.parseHTML(output));
        }
    }
    return output;
};
$('div').each( (index, elem, v3) => {
    var detected_sizes = detectWindowSize();

    // console.log(detected_sizes);
    // console.log(elem.classList);
    // console.log($('<span>').addClass('tester').text("??test??").get(0).outerHTML);
    applyTextIndication("test", $('<span>').addClass('tester').text("??text??"), elem, '.tester');


    console.log({
        detected_sizes: detected_sizes
    })
});