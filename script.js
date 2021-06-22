// timer
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;

function startTimer () {
    tens += 1;  
    if(tens <= 9)
      appendTens.innerHTML = "0" + tens;
   
    if (tens > 9)
      appendTens.innerHTML = tens;

    if (tens > 99) {
      seconds += 1;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9)
      appendSeconds.innerHTML = seconds;
}

function start_timer() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stop_timer() {
    clearInterval(Interval);
}

function reset_timer() {
    clearInterval(Interval);
    seconds = 00; 
    tens = 00; 
    appendTens.innerHTML = '00';
  	appendSeconds.innerHTML = '00';   
}

// editor / code
var current_problem = "";
var solution = [];
var manual_mode = true;
var timer_started = 0;
var next_problem = false;
var problem_index = 0;

var titles = [
    'Two Sum', // 1
    'Add Two Numbers', // 2
    'LRU Cache', // 3
    'Trapping Rain Water', // 4
    'Longest Palindromic Substring', // 5
    'Median of Two Sorted Arrays', // 6
    'Number of Islands', // 7
    '3Sum', // 8
    'Maximum Subarray', // 9
    'Longest Substring Without Repeating Characters', // 10
    'Merge Two Sorted Lists', // 11
    'Valid Parentheses', // 12
    'Product of Array Except Self', // 13
    'Merge k Sorted Lists', // 14
    'Reorder Data in Log Files', // 15
    'Happy Number', // 16
    'Merge Intervals', // 17
    'Minimum Domino Rotations For Equal Row', // 18
    'Fizz Buzz', // 19
    'Reverse Linked List', // 20
    'Climbing Stairs', // 21
    'Maximum Depth of Binary Tree', // 22
    'Valid Palindrome', // 23
    'Contains Duplicate', // 24
    'Reverse String', // 25
    'Test Function'
];

var problems = [
    [
        "public int[] TwoSum(int[] nums, int target) {",
        "   ",
        "    if(nums == null || nums.Length < 2)",
        "        return new int[2];",
        "   ",
        "    Dictionary<int,int> dic = new Dictionary<int, int>();",
        "   ",
        "    for(int i = 0; i < nums.Length; i++) {",
        "   ",
        "        if(dic.ContainsKey(target - nums[i]))",
        "            return new int[]{i, dic[target - nums[i]]};",
        "   ",
        "        else if(!dic.ContainsKey(nums[i]))",
        "            dic.Add(nums[i], i);",
        "    }",
        "   ",
        "    return new int[2];",
        "}",        
    ],
    [
        "public ListNode AddTwoNumbers(ListNode l1, ListNode l2) {",
        "    ListNode head = null;",
        "    ListNode trav = null;",
        "   ",
        "    var carry = 0;",
        "   ",
        "    while (l1 != null || l2 != null || carry > 0) {",
        "        var digit1 = l1 != null ? l1.val: 0;",
        "        var digit2 = l2 != null ? l2.val: 0;",
        "   ",
        "        var sum = digit1 + digit2 + carry;",
        "        var digit3 = sum % 10;",
        "   ",
        "        if (head == null) {",
        "            head = trav = new ListNode(digit3);",
        "        }",
        "        else {",
        "            trav.next = new ListNode(digit3);",
        "            trav = trav.next;",
        "        }",
        "   ",
        "        carry = sum / 10;",
        "   ",
        "        l1 = l1 != null ? l1.next: null;",
        "        l2 = l2 != null ? l2.next: null;",
        "    }",
        "   ",
        "    return head;",
        "}",
    ],
    [
        "public class Cache {",
        "    public int CacheKey;",
        "    public int CacheVal;",
        "    public Cache(int key, int val) {",
        "        CacheKey = key;",
        "        CacheVal = val;",
        "    }",
        "}",
        "   ",
        "public int Capacity = 0;",
        "public Dictionary <int, LinkedListNode <Cache>> dic = new Dictionary <int, LinkedListNode <Cache>>();",
        "public LinkedList <Cache> lruList = new LinkedList <Cache>();",
        "   ",
        "public LRUCache(int capacity) {",
        "    this.Capacity = capacity;",
        "}",
        "   ",
        "public int Get(int key) {",
        "    if (!dic.ContainsKey(key))",
        "        return - 1;",
        "   ",
        "    var cache = dic[key];",
        "    lruList.Remove(cache);",
        "    lruList.AddFirst(cache);",
        "   ",
        "    return cache.Value.CacheVal;",
        "}",
        "   ",
        "public void Put(int key, int value) {",
        "    if (dic.ContainsKey(key)) {",
        "        dic[key].Value.CacheVal = value;",
        "   ",
        "        var cache = dic[key];",
        "        lruList.Remove(cache);",
        "        lruList.AddFirst(cache);",
        "    }",
        "    else {",
        "        Cache cache = new Cache(key, value);",
        "        dic.Add(key, new LinkedListNode <Cache> (cache));",
        "        lruList.AddFirst(dic[key]);",
        "   ",
        "        if (dic.Count > Capacity) {",
        "            LinkedListNode <Cache> lastCache = lruList.Last;",
        "            dic.Remove(lastCache.Value.CacheKey);",
        "            lruList.Remove(lastCache);",
        "        }",
        "    }",
        "}",
    ],
    [
        "public int Trap(int[] land) {",
        "    var wall = 0;",
        "    var water = new int[land.Length];",
        "    ",
        "    for (var i = 0; i < water.Length; i++) {",
        "        wall = Math.Max(wall, land[i]);",
        "        water[i] = wall - land[i];",
        "    }",
        "    wall = 0;",
        "    var sum = 0;",
        "    ",
        "    for (var i = water.Length - 1; i >= 0; i--) {",
        "        wall = Math.Max(wall, land[i]);",
        "        water[i] = Math.Min(water[i], wall - land[i]);",
        "        sum += water[i];",
        "    }",
        "    return sum;",
        "}",
    ],
    [
        "public static string LongestPalindrome(string s) {",
        "    if (string.IsNullOrEmpty(s))",
        "        return string.Empty;",
        "    ",
        "    var n = s.Length;",
        "    var dp = new bool[n, n];",
        "    int maxLen = 0;",
        "    int startIndex = 0;",
        "    ",
        "    for (int i = 0; i < n; i++) {",
        "        for (int j = 0; j <= i; j++) {",
        "            if (s[i] == s[j]) {",
        "                int l = i - j + 1;",
        "                if (l < 3 || dp[i - 1, j + 1]) {",
        "                    dp[i, j] = true;",
        "                    if (l > maxLen) {",
        "                        maxLen = l;",
        "                        startIndex = j;",
        "                    }",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return s.Substring(startIndex, maxLen);",
        "}",
    ],
    [
        "public double FindMedianSortedArrays(int[] nums1, int[] nums2) {",
        "    if (nums2.Length < nums1.Length) {",
        "        var temp = nums1;",
        "        nums1 = nums2;",
        "        nums2 = temp;",
        "    }",
        "   ",
        "    var n = nums1.Length;",
        "    var m = nums2.Length;",
        
        "    var start = 0;",
        "    var end = n;",
        "   ",
        "    while (start <= end) {",
        "        var blockN = start + (end - start) / 2;",
        "        var blockM = (n + m + 1) / 2 - blockN;",
        "   ",
        "        var blockNMin = blockN == 0 ? int.MinValue: nums1[blockN - 1];",
        "        var blockNMax = blockN == n ? int.MaxValue: nums1[blockN];",
        "        var blockMMin = blockM == 0 ? int.MinValue: nums2[blockM - 1];",
        "        var blockMMax = blockM == m ? int.MaxValue: nums2[blockM];",
        "   ",
        "        if (blockNMin <= blockMMax && blockMMin <= blockNMax) {",
        "            if ((m + n) % 2 == 1) {",
        "                return Math.Max(blockNMin, blockMMin);",
        "            }",
        "            else {",
        "                return (Math.Max(blockNMin, blockMMin) + Math.Min(blockNMax, blockMMax)) / 2.0;",
        "            }",
        "        }",
        "        else if (blockNMin > blockMMax) {",
        "            end = blockN - 1;",
        "        }",
        "        else {",
        "            start = blockN + 1;",
        "        }",
        "    }",
        "   ",
        "    throw new Exception();",
        "}",
    ],
    [
        "public int NumIslands(char[][] grid) {",
        "    if (grid == null || grid.Length == 0)",
        "        return 0;",
        "   ",
        "    var counter = 0;",
        "    var yMax = grid.Length;",
        "    var xMax = grid[0].Length;",
        "   ",
        "    for (var y = 0; y < yMax; y++)",
        "    for (var x = 0; x < xMax; x++)",
        "    if (grid[y][x] == '1') {",
        "        TraversIsland(x, y);",
        "        counter++;",
        "    }",
        "   ",
        "    return counter;",
        
        "    void TraversIsland(int x, int y) {",
        "        if (x < 0 || x >= xMax || y < 0 || y >= yMax || grid[y][x] != '1')",
        "            return;",
        "   ",
        "        grid[y][x] = '0';",
        "        TraversIsland(x, y + 1);",
        "        TraversIsland(x, y - 1);",
        "        TraversIsland(x + 1, y);",
        "        TraversIsland(x - 1, y);",
        "    }",
        "}",
    ],
    [
        "public IList<IList<int>> ThreeSum(int[] nums) {",
        "    IList <IList <int>> result = new List <IList <int>> ();",
        "    ",
        "    if (nums.Length <= 2)",
        "        return result;",
        "    ",
        "    Array.Sort(nums);",
        "    ",
        "    int start = 0, left, right;",
        "    int target;",
        "    ",
        "    while (start < nums.Length - 2) {",
        "        target = nums[start] * -1;",
        "        left = start + 1;",
        "        right = nums.Length - 1;",
        "    ",
        "        while (left < right) {",
        "            if (nums[left] + nums[right] > target) {",
        "                --right;",
        "            }",
        "            else if (nums[left] + nums[right] < target) {",
        "                ++left;",
        "            }",
        "            else {",
        "                List < int > OneSolution = new List < int > () {",
        "                    nums[start],",
        "                    nums[left],",
        "                    nums[right]",
        "                };",
        "    ",
        "                result.Add(OneSolution);",
        "    ",
        "                while (left < right && nums[left] == OneSolution[1])",
        "                    ++left;",
        "                while (left < right && nums[right] == OneSolution[2])",
        "                    --right;",
        "            }",
        "    ",
        "        }",
        "    ",
        "        int currentStartNumber = nums[start];",
        "        while (start < nums.Length - 2 && nums[start] == currentStartNumber)",
        "            ++start;",
        "    }",
        "    ",
        "    return result;",
        "}",
    ],
    [
        "public int MaxSubArray(int[] nums) {",
        "    int sum = 0;",
        "    int maxSum = nums[0];",
        "   ",
        "    for (int i = 0; i < nums.Length; i++) {",
        "        sum += nums[i];",
        "        if (nums[i] > sum) {",
        "            sum = nums[i];",
        "        }",
        "        if (sum > maxSum) {",
        "            maxSum = sum;",
        "        }",
        "    }",
        "    return maxSum;",
        "}",
    ],
    [
        "public int LengthOfLongestSubstring(string s) {",
        "    if (string.IsNullOrEmpty(s)) {",
        "        return 0;",
        "    }",
        "   ",
        "    var startIndex = 0;",
        "    var endIndex = 0;",
        "    var length = 0;",
        "    var charSet = new Dictionary <char,int> ();",
        "    ",
        "    while (endIndex < s.Length) {",
        "        if (charSet.ContainsKey(s[endIndex])) {",
        "            length = Math.Max(length, endIndex - startIndex);",
        "            startIndex = charSet[s[endIndex]] + 1;",
        "            endIndex = startIndex;",
        "            charSet.Clear();",
        "        }",
        "        else {",
        "            charSet.Add(s[endIndex], endIndex);",
        "            endIndex++;",
        "        }",
        "    }",
        "    length = Math.Max(length, endIndex - startIndex);",
        "   ",
        "    return length;",
        "}",
    ],
    [
        "public ListNode MergeTwoLists(ListNode l1, ListNode l2) {",
        "    if (l1 == null) return l2;",
        "    if (l2 == null) return l1;",
        "    ",
        "    if (l1.val <= l2.val) {",
        "        l1.next = MergeTwoLists(l1.next, l2);",
        "        return l1;",
        "    }",
        "    else {",
        "        l2.next = MergeTwoLists(l1, l2.next);",
        "        return l2;",
        "    }",
        "}",
    ],
    [
        "public bool IsValid(string s) {",
        "    var k = new Stack <char>();",
        "    ",
        "    foreach(char c in s) {",
        "        if (c == '(') {",
        "            k.Push(')');",
        "            continue;",
        "        }",
        "        if (c == '{') {",
        "            k.Push('}');",
        "            continue;",
        "        }",
        "        if (c == '[') {",
        "            k.Push(']');",
        "            continue;",
        "        }",
        "        if (k.Count == 0 || c != k.Pop())",
        "            return false;",
        "    }",
        "   ",
        "    return k.Count == 0;",
        "}",
    ],
    [
        "private int[] ProductOfArrayWithoutSelf_WithoutDivision(int[] arr) {",
        "    if (arr == null || arr.Length < 2)",
        "        return arr;",
        "   ",
        "    int[] result = new int[arr.Length];",
        "    int left = 1;",
        "    int right = 1;",
        "    ",
        "    for (int i = 0; i < arr.Length; i++) {",
        "        result[i] = left;",
        "        left *= arr[i];",
        "    }",
        "   ",
        "    for (int i = arr.Length - 1; i >= 0; i--) {",
        "        result[i] *= right;",
        "        right *= arr[i];",
        "    }",
        "   ",
        "    return result;",
        "}",
    ],
    [
        "public ListNode MergeKLists(ListNode[] lists) {",
        "    if (lists == null) ",
        "        return null;",
        "   ",
        "    var ss = new SortedSet < (int Value, int Index, ListNode Node) > ();",
        "    ",
        "    for (int i = 0; i < lists.Length; i++)",
        "        if (lists[i] != null)",
        "            ss.Add((lists[i].val, i, lists[i]));",
        "   ",
        "    ListNode head = new ListNode(), tail = head;",
        "    ",
        "    while (ss.Count > 0) {",
        "        var min = ss.Min;",
        "        ss.Remove(min);",
        "   ",
        "        tail.next = min.Node;",
        "        tail = tail.next;",
        "   ",
        "        var next = min.Node.next;",
        "        if (next != null) s",
        "            s.Add((next.val, min.Index, next));",
        "    }",
        "    return head.next;",
        "}",
    ],
    [
        "public string[] ReorderLogFiles(string[] logs) {",
        "    return logs.Where(x = >!char.IsDigit(x[x.IndexOf(' ') + 1])).OrderBy(y = >y.Split(' ', 2)[1]).ThenBy(z = >z.Split(' ', 2)[0]).Union(logs.Where(x = >char.IsDigit(x[x.IndexOf(' ') + 1]))).ToArray();",
        "}",
    ],
    [
        "public bool IsHappy(int n) {",
        "    var set = new HashSet <int>();",
        "    ",
        "    while (true) {",
        "        if (set.Contains(n))",
        "            return false;",
        "   ",
        "        set.Add(n);",
        "        n = SquareSum(Digits(n));",
        "   ",
        "        if (n == 1)",
        "           return true;",
        "    }",
        "    ",
        "    int[] Digits(int i) => i.ToString().ToCharArray().Select(c => c - '0').ToArray();",
        "    int SquareSum(int[] digits) => digits.Select(d => d * d).Sum();",
        "}",        
    ],
    [
        "public int[][] Merge(int[][] intervals) {",
        "    intervals = (from pair in intervals",
        "    orderby pair[1]",
        "    orderby pair[0]",
        "    select pair).ToArray();",
        "    ",
        "    List < int[] > merged = new List < int[] > (intervals.Length) {",
        "        intervals[0]",
        "    };",
        "    ",
        "    int currIndex = 0;",
        "    ",
        "    for (int i = 1; i < intervals.Length; i++) {",
        "        if (intervals[i][0] > merged[currIndex][1]) {",
        "            merged.Add(intervals[i]);",
        "            currIndex++;",
        "        }",
        "        else if (intervals[i][0] <= merged[currIndex][1]) ",
        "            merged[currIndex][1] = Math.Max(intervals[i][1], merged[currIndex][1]);",
        "    }",
        "    ",
        "    return merged.ToArray();",
        "}",
    ],
    [
        "public int MinDominoRotations(int[] A, int[] B) {",
        "    int[] nums = new int[7];",
        "    int number = 0;",
        "   ",
        "    for (int i = 0; i < A.Length; i++) {",
        "   ",
        "        nums[A[i]]++;",
        "   ",
        "        if (A[i] != B[i]) {",
        "            nums[B[i]]++;",
        "            if (nums[B[i]] == A.Length)",
        "                number = B[i];",
        "        }",
        "   ",
        "        if (nums[A[i]] == A.Length)",
        "            number = A[i];",
        "    }",
        "   ",
        "    if (number == 0)",
        "        return - 1;",
        "   ",
        "    int rotateA = 0;",
        "    int rotateB = 0;",
        "    ",
        "    for (int i = 0; i < A.Length; i++) {",
        "        if (A[i] != number)",
        "            rotateA++;",
        "            ",
        "        if (B[i] != number)",
        "            rotateB++;",
        "    }",
        "   ",
        "    return Math.Min(rotateA, rotateB);",
        "}",
    ],
    [
        "public IList <string> FizzBuzz(int n) {",
        "    List <string> result = new List <string> (n);",
        "    ",
        "    for (int i = 1, fizz = 0, buzz = 0; i <= n; i++) {",
        "        fizz++;",
        "        buzz++;",
        "        ",
        "        if (fizz == 3 && buzz == 5) {",
        '            result.Add("FizzBuzz");',
        "            fizz = 0;",
        "            buzz = 0;",
        "        }",
        "        else if (fizz == 3) {",
        '            result.Add("Fizz");',
        "            fizz = 0;",
        "        }",
        "        else if (buzz == 5) {",
        '            result.Add("Buzz");',
        "            buzz = 0;",
        "        }",
        "        else {",
        "            result.Add(i.ToString());",
        "        }",
        "    }",
        "    return result;",
        "}",
    ],
    [
        "public ListNode ReverseList(ListNode head) {",
        "    if (head == null)",
        "        return null;",
        "   ",
        "    ListNode prev = null;",
        "    ListNode next = head.next;",
        "    while (next != null) {",
        "        head.next = prev;",
        "        prev = head;",
        "        head = next;",
        "        next = head.next;",
        "    }",
        "    head.next = prev;",
        "    return head;",
        "}",
    ],
    [
        "public int ClimbStairs(int n) {",
        "    if (n < 3)",
        "        return n;",
        "   ",
        "    int n_2 = 2;",
        "    int n_1 = 1;",
        "    int res = 0;",
        "   ",
        "    int i = 3;",
        "    while (i++<=n) {",
        "        res = n_2 + n_1;",
        "        n_1 = n_2;",
        "        n_2 = res;",
        "    }",
        "   ",
        "    return res;",
        "}",
    ],
    [
        "public int MaxDepth(TreeNode node) {",
        "    return node == null ? 0 : Math.Max(MaxDepth(node.left), MaxDepth(node.right)) + 1;",
        "}",
    ],
    [
        "public bool IsPalindrome(string s) {",
        "    int i = 0;",
        "    int j = s.Length - 1;",
        "    s = s.ToLower();",
        "    ",
        "    while (i < j) {",
        "        if (!char.IsLetterOrDigit(s[i]))",
        "            i++;",
        "        else if (!char.IsLetterOrDigit(s[j]))",
        "            j--;",
        "        else if (s[i++] != s[j--])",
        "            return false;",
        "    }",
        "   ",
        "    return true;",
        "}",
    ],
    [
        "using System.Linq;",
        "public class Solution {",
        "    public bool ContainsDuplicate(int[] nums) {",
        "        return nums.Distinct().Count() != nums.Length;",
        "    }",
        "}",
    ],
    [
        "public void ReverseString(char[] s) {",
        "    int left = 0, right = s.Length - 1;",
        "    while (left < right)",
        "        (s[left], s[right]) = (s[right--], s[left++]);",
        "}",
    ],
    [
        "public void Test(int t) {",
        "   ",
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

/* setup editor functionality */
window.onload = function () 
{    
    solution_element = document.getElementById('solution-text');
    solution_editor =  CodeMirror.fromTextArea(solution_element, code_options);
    solution_editor.setOption("mode", "text/x-csharp");
    solution_editor.setOption("readOnly", "true");
    solution_editor.setSize(1200, 650);
    
    user_element = document.getElementById('user-text');
    user_editor = CodeMirror.fromTextArea(user_element, code_options);
    user_editor.setOption("mode", "text/x-csharp");
    user_editor.setSize(1200, 40);

    var char_index = 0;
    var line_index = 0;
    var correct_input = ""; // correctly typed input thus far
    var user_wpm = 0;
    var chars_typed = 0;

    function reset_vars() {
        char_index = 0;
        chars_typed = 0;
        user_wpm = 0;
        line_index = 0;
        correct_input = "";
        user_editor.setValue(correct_input);
    }

    // prevent code paste
    user_editor.on("beforeChange", function(_, change) {
        if (change.origin == "paste") 
            change.cancel()
    });
    
    // handle certain keyboard presses
    user_editor.on("keydown", function (cm, event) {
        // prevent backspace
        if (event.keyCode == 8) 
            event.preventDefault();
        
        // prevent enter
        if (event.keyCode == 13) 
            event.preventDefault();
    });

    function update_wpm() {
        document.getElementById("wpm_str").innerHTML = "WPM: " + user_wpm;
    }

    function calculate_wpm() {
        let seconds = document.getElementById("seconds").innerHTML;
        user_wpm = Math.round(((chars_typed / seconds) * 60) / 5);
    }

    function compare_solution(change) { 
        
        let expected_char = solution[line_index][char_index];
        if (expected_char == change.text[0]) {          
            correct_input += expected_char; // good
            char_index += 1; 
            chars_typed += 1;
            calculate_wpm();
        }
        else {
            // delete/replace incorrect input
            user_editor.setValue(correct_input) // replace with correct text thus far
            user_editor.focus(); // Set the cursor at the end of existing content
            user_editor.setCursor(user_editor.lineCount(), 0);
            return;
        }
         
        // determine if we move to next line
        if (char_index == solution[line_index].length) {

            char_index = 0;
            line_index += 1;
            user_editor.setValue("");
            correct_input = "";

            // handle empty lines
            try {
                if (!solution[line_index].includes("}")) {
                    var trim = solution[line_index].trim();
                    if (trim.length == 0)
                        line_index += 1;
                }                 
            } catch (error) {
                // solution reached. Reset & Open complete-dialog
                update_wpm();
                stop_timer();
                reset_vars();
                document.getElementsByClassName("problem_dialog")[0].style.display = "";
                document.getElementsByClassName("view-modal")[0].click(); 

                if (manual_mode == false)
                    setTimeout(function(){ document.getElementById("next_question").click(); }, 7000);
            }
            
            // handle spaces at beginning of non-empty:
            try {
                for (let i = 0; i < solution[line_index].length; i++) {
                    if (solution[line_index][i] == ' ')
                        char_index += 1;
                    else
                        break;
                }    
            } 
            catch (error) {
                // solution reached. Reset & Open complete-dialog
                update_wpm();
                stop_timer();
                reset_vars();
                document.getElementsByClassName("problem_dialog")[0].style.display = "";
                document.getElementsByClassName("view-modal")[0].click();
                
                if (manual_mode == false)
                    setTimeout(function(){ document.getElementById("next_question").click(); }, 7000);
            }
        }
    }

    // handle user input
    user_editor.on("inputRead", function(_, change) {
        // start counter initially
        if (timer_started == 0) {
            timer_started = 1;
            start_timer();
        }
        compare_solution(change);
    });

    // let random_index = Math.floor(Math.random() * problems.length);
    let random_index = 25;
    problem_index = random_index;
    let problem = problems[random_index];
    solution = problem;
    current_problem = titles[random_index];

    for (let i = 0; i < problem.length; i++) {
        solution_editor.replaceRange(problem[i] + '\n', {line: Infinity});
    }
    problem_label();
}

/* reload page */
function refresh() {
    location.reload();
}

/* Creates a label for the current problem */
function problem_label() {
    document.getElementById("problem_label").innerHTML = current_problem;
}

/* Popup handler */
const viewBtn = document.querySelector(".view-modal"),
      popup = document.querySelector(".popup"),
      close = popup.querySelector(".close"),
      field = popup.querySelector(".field"),
      input = field.querySelector("input"),
      copy = field.querySelector("button");

viewBtn.onclick = ()=> {
  popup.classList.toggle("show");
}

/* Try current problem again */
function try_again() {
    reset_timer();
    timer_started = 0;
    document.getElementsByClassName("problem_dialog")[0].style.display = "none";
    document.getElementsByClassName("view-modal")[0].style.display = "none";
    viewBtn.click();
}

/* Load next problem */
function new_problem() {
    let new_index = 0;
    while (true) {
        new_index = Math.floor(Math.random() * problems.length);
        if (new_index != problem_index)
            break;
    }

    let problem = problems[new_index];
    solution = problem;
    current_problem = titles[new_index];
    
    problem_label();
    try {
        solution_editor.setValue("");
        for (let i = 0; i < problem.length; i++) {
            solution_editor.replaceRange(problem[i] + '\n', {line: Infinity});
        }
    }
    catch(e) {
        console.log(e);
    }
    try_again();
}

/* Change typing mode */
function radio_check(mode) {
    if (mode == 'manual')
        manual_mode = true;
    else
        manual_mode = false;
}