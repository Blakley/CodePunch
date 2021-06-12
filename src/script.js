// 
CodeMirror(document.querySelector('#code-editor'), {
    lineNumbers: true,
    tabSize: 4,
    value: ' // main \n public static void Main(string[] args) \n { \n\t Console.WriteLine("Hello, world!"); \n }',
    mode: 'text/x-csharp',
    theme: 'darcula',
});

function navigateFolder() {
    alert("Clicked folder");
}

function navigateUser() {
    alert("Clicked user");
}

function navigateSearch() {
    alert("Clicked Search");
}

function navigateSettings() {
    alert("Clicked Settings");
}