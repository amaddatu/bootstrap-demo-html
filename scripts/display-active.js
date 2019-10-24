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
    var detected_sizes = [ ];
    var view_width = $(window).width();
    bootstrap_properties.sizes.forEach( (value, index) => {
        if(typeof bootstrap_properties.breaks[value] !== 'undefined'){
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
            $(elem).prepend($.parseHTML(output));
        }
    }
    return output;
};
var getOnlyColumnClasses = (elem) => {
    var column_classes = [];
    if(typeof elem !== 'undefined'){
        var col = bootstrap_properties.column_name;
        var class_list = $(elem).get(0).classList;
        class_list.forEach( (value, index) => {
            if(value == col){
                column_classes.push(value);
            }
            else if( value.startsWith(col + '-')){
                column_classes.push(value);
            }
        });
    }
    return column_classes;
};
var getSpecificSizeClasses = (elem, size) => {
    var specific_classes = [];
    if(typeof elem !== 'undefined'){
        var col = bootstrap_properties.column_name;
        var sizes = bootstrap_properties.sizes;
        var search_array = [];
        if(Array.isArray(elem)){
            search_array = elem;
        }
        else{
            search_array = getOnlyColumnClasses(elem);
        }
        search_array.forEach( (value, index) => {
            if(size !== 'default'){
                if( value.startsWith(col + '-' + size)){
                    specific_classes.push(value);
                }
            }
            else{
                var non_default = false;
                for(var i = 0; i < sizes.length; i++){
                    if( value.startsWith(col + '-' + sizes[i]) ){
                        non_default = true;
                    }
                }
                if(!non_default){
                    specific_classes.push(value);
                }
            }
        });
    }
    return specific_classes;
};
var applyDisplayText = () => {
    $('div').each( (index, elem, v3) => {
        var detected_sizes = detectWindowSize();
        detected_sizes = detected_sizes.reverse();
        var column_classes = getOnlyColumnClasses(elem);
    
        // console.log(detected_sizes);
        // console.log(elem.classList);
        // console.log($('<span>').addClass('tester').text("??test??").get(0).outerHTML);
        // applyTextIndication("test", $('<span>').addClass('tester').text("??text??"), elem, '.tester');
        if(column_classes.length > 0){
            var found = false;
            var applied_classes = [];
            for(var i = 0; i < detected_sizes.length; i++){
                var size = detected_sizes[i];
                var specific_classes = getSpecificSizeClasses(column_classes, size);
                if(specific_classes.length > 0){
                    applied_classes = specific_classes;
                    break;
                }
            }
            if(applied_classes.length <= 0){
                applied_classes = getSpecificSizeClasses(column_classes, 'default');
            }
            applyTextIndication(
                applied_classes.join(', '), 
                $('<div>').append($('<div>').addClass('applied-classes').text("??text??")).append($('<br>')), 
                elem, 
                '.applied-classes');
            console.log({
                detected_sizes: detected_sizes,
                column_classes: getOnlyColumnClasses(elem),
                default: getSpecificSizeClasses(elem, 'default'),
                xs: getSpecificSizeClasses(elem, 'xs'),
                sm: getSpecificSizeClasses(elem, 'sm'),
                md: getSpecificSizeClasses(elem, 'md'),
                lg: getSpecificSizeClasses(elem, 'lg'),
                xl: getSpecificSizeClasses(elem, 'xl')
            });
        }
        
    });
};
$(document).ready(applyDisplayText);

$(window).resize(applyDisplayText);