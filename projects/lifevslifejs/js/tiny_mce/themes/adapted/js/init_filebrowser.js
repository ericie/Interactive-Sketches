function DjangoFileBrowser(field_name, url, type, win) {
    var cmsURL = "/admin/filebrowser/?pop=2";
    cmsURL = cmsURL + "&type=" + type;
    
    tinyMCE.activeEditor.windowManager.open({
        file: cmsURL,
        width: 820,  // Your dimensions may differ - toy around with them!
        height: 500,
        resizable: "yes",
        scrollbars: "yes",
        inline: "no",  // This parameter only has an effect if you use the inlinepopups plugin!
        close_previous: "no"
    }, {
        window: win,
        input: field_name,
        editor_id: tinyMCE.selectedInstance.editorId
    });
    return false;
}


tinyMCE.init({ 
        file_browser_callback : "DjangoFileBrowser"
});


/*
tinyMCE.init(
"file_browser_callback": "DjangoFileBrowser" 
)*/