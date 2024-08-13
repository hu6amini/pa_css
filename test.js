// Configuration options for Quill 
const options = { 
    debug: 'info', 
    modules: { 
        toolbar: [ 
            ['bold', 'italic', 'underline'], // Text formatting 
            ['strike', 'blockquote'], // Strikethrough and blockquote 
            [{ 'header': [1, 2, false] }], // Header options 
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists 
            [{ 'color': [] }, { 'background': [] }], // Text color and background color 
            [{ 'align': [] }], // Text alignment 
            ['link', 'image'], // Link and image options 
            ['clean'] // Remove formatting button 
        ] 
    }, 
    placeholder: 'Compose an epic...', // Set the placeholder text 
    theme: 'snow' // Use the 'snow' theme 
}; 

// Initialize Quill editor 
const quill = new Quill('#editor', options); 

// Emoticon replacement function
function replaceEmoticons(text) {
    const emoticonMap = {
        ':)': '🙂',
        ':(': '☹️',
        ';)': '😉',
        ':-P': '😛',
        ':-p': '😛',
        ':P': '😛',
        ';P': '😜',
        ';-P': '😜',
        ':-D': '😀',
        ':D': '😀',
        ':fire:': '🔥',
        // Add more emoticons as needed
    };

    // Use a regular expression to replace emoticons
    return text.replace(/(:\)|:\(|;\)|:-P|:-p|:P|;P|:-D|:D)/g, match => emoticonMap[match]);
}

// Sync Quill with the textarea 
quill.on('text-change', function() { 
    // Get the current selection range
    const range = quill.getSelection();
    
    // Get the current text content 
    let content = quill.getText(); 

    // Replace emoticons with emojis in the text content
    const updatedContent = replaceEmoticons(content);
    
    // Check if the content has changed
    if (content !== updatedContent) {
        // Clear the editor
        quill.setText('');

        // Insert the updated content
        quill.insertText(0, updatedContent);

        // Restore the cursor position if there was a selection
        if (range) {
            quill.setSelection(range.index, range.length);
        }
    }

    // Set it to the textarea 
    document.getElementById('Post').value = updatedContent; 
}); 

// Optional: Sync the textarea to Quill on page load or other events 
document.addEventListener('DOMContentLoaded', function() { 
    const initialContent = document.getElementById('Post').value; 
    quill.root.innerHTML = initialContent; // Set initial content to Quill 
}); 
