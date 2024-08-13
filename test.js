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
 
 // Emoji mapping
 const emojiMap = {
     ':)': '🙂',
     ':(': '☹️',
     ';)': '😉',
     ':-P': '😛',
     ':-p': '😛',
     ':P': '😛',
     ';P': '😜',
     ':-D': '😀',
     ':D': '😀',
     ':fire:': '🔥', // Example of a custom emoji representation
     // Add more emoji mappings as needed
 };

 // Function to replace text representations with emojis
 function replaceEmojis(text) {
     // Use a regular expression to replace emoji representations
     return text.replace(/(:\)|:\(|;\)|:-P|:-p|:P|;P|:-D|:D|:fire:)/g, match => emojiMap[match]);
 }

 // Sync Quill with the textarea 
 quill.on('text-change', function() { 
     // Get the current content 
     const content = quill.root.innerText; // Use innerText to get plain text
     
     // Replace text representations with emojis
     const updatedContent = replaceEmojis(content);

     // Clear the editor and insert updated content
     quill.setText(''); // Clear current text
     quill.insertText(0, updatedContent); // Insert updated content

     // Update the textarea value
     document.getElementById('Post').value = updatedContent; 
 }); 
 
 // Optional: Sync the textarea to Quill on page load or other events 
 document.addEventListener('DOMContentLoaded', function() { 
     const initialContent = document.getElementById('Post').value; 
     quill.root.innerHTML = initialContent; // Set initial content to Quill 
 }); 
