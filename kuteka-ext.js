// Ask the user if they want to quit.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
// TODO: only register if there are unsaved changes. 
window.onbeforeunload = function (event) {
    event.preventDefault();
    event.returnValue = true;
}

// https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
function download(filename, data) {
    var name = consume_js_object(filename)
    var file = new Blob([consume_js_object(data)]);

    var a = document.createElement("a");
    var url = URL.createObjectURL(file);

    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();

    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

register_plugin = function (importObject) {
    // make the function available to call from rust
    importObject.env.download = download;
}

miniquad_add_plugin({
    register_plugin, 
    name: "kuteka-js-integration",
    version: "0.1.0"
});