// https://www.freecodeformat.com/c-format.php
// find: (.+), replace: \"$1\",
// https://github.com/xizhengszhang/Leetcode_company_frequency/blob/master/100%20Most%20Asked%20Problems%20-%20LeetCode.pdf

var titles = [
    'Two Sum',
];

var problems = [
    [
        "public int[] TwoSum(int[] nums, int target) {",
        "    ",
        "    if(nums == null || nums.Length < 2)",
        "        return new int[2];",
        "    ",
        "    Dictionary<int,int> dic = new Dictionary<int,int>();",
        "    ",
        "    for(int i = 0; i < nums.Length; i++) ",
        "    {",
        "        if(dic.ContainsKey(target - nums[i]))",
        "            return new int[]{i, dic[target - nums[i]]};",
        "        ",
        "        else if(!dic.ContainsKey(nums[i]))",
        "            dic.Add(nums[i], i);",
        "    }",
        "    ",
        "    return new int[2];",
        "}",        
    ]
];

let code_options = {
    autofocus: true,
    lineWrapping: true,
    viewportMargin: Infinity,
    scrollbarStyle: "null",
    tabSize: 4,
    indentUnit: 4,
    smartIndent: true,
    theme: 'material-darker',
}

let solution_editor, solution_element;
let user_editor, user_element;

window.onload = function () {
    solution_element = document.getElementById('solution-text');
    solution_editor =  CodeMirror.fromTextArea(solution_element, code_options);
    solution_editor.setOption("mode", "text/x-csharp");
    solution_editor.setOption("readOnly", "true");
    solution_editor.setSize(850, 700);
    
    user_element = document.getElementById('user-text');
    user_editor = CodeMirror.fromTextArea(user_element, code_options);
    user_editor.setOption("mode", "text/x-csharp");
    user_editor.setSize(850, 700);
    
    user_editor.on("beforeChange", function(_, change) {
        if (change.origin == "paste") change.cancel()
    });

    let start_problem = problems[Math.floor(Math.random()*problems.length)];
    for (let i = 0; i < start_problem.length; i++) {
        solution_editor.replaceRange(start_problem[i] + '\n', {line: Infinity});
    }
}

function refresh() {
    location.reload();
}
