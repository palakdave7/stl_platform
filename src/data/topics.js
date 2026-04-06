export const topics = [
  {
    id: 'vector',
    title: 'Vector',
    icon: '📦',
    color: 'from-blue-500 to-cyan-400',
    tagColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    category: 'Containers',
    difficulty: 'Beginner',
    description: 'Dynamic array that grows automatically as you add elements.',
    shortDesc: 'Dynamic resizable array',
    header: 'vector',
    include: '#include <vector>',
    explanation: `A vector is like a magical array that can grow on its own. Unlike normal arrays where you must define the size upfront, vectors automatically resize when you add more elements. Think of it like a rubber band — it stretches as needed.

Every vector internally has two important values: **size** (how many elements are stored) and **capacity** (how much memory is reserved). When size equals capacity and you add one more element, the vector doubles its capacity.`,
    syntax: `vector<type> name;
vector<int> v;
vector<string> words;
vector<int> v(5, 0);  // 5 elements, all 0`,
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;

    // Add elements
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);

    cout << "Size: " << v.size() << endl;       // 3
    cout << "Capacity: " << v.capacity() << endl; // 4 (usually)

    // Access elements
    cout << v[0] << endl;    // 10
    cout << v.front() << endl; // 10
    cout << v.back() << endl;  // 30

    // Iterate
    for (int x : v) cout << x << " ";  // 10 20 30

    // Remove last
    v.pop_back();
    cout << "\\nAfter pop: " << v.size(); // 2

    return 0;
}`,
    methods: [
      { name: 'push_back(val)', desc: 'Add element at end', complexity: 'O(1) amortized' },
      { name: 'pop_back()', desc: 'Remove last element', complexity: 'O(1)' },
      { name: 'size()', desc: 'Number of elements', complexity: 'O(1)' },
      { name: 'capacity()', desc: 'Allocated memory space', complexity: 'O(1)' },
      { name: 'at(i)', desc: 'Access with bounds check', complexity: 'O(1)' },
      { name: 'front()', desc: 'First element', complexity: 'O(1)' },
      { name: 'back()', desc: 'Last element', complexity: 'O(1)' },
      { name: 'empty()', desc: 'Check if empty', complexity: 'O(1)' },
      { name: 'clear()', desc: 'Remove all elements', complexity: 'O(n)' },
      { name: 'insert(it, val)', desc: 'Insert at position', complexity: 'O(n)' },
      { name: 'erase(it)', desc: 'Remove at position', complexity: 'O(n)' },
    ],
    useCases: [
      'Storing a list of student marks',
      'Building dynamic arrays when size is unknown',
      'Implementing adjacency lists in graphs',
      'Replacing normal arrays for safer access',
    ],
    mistakes: [
      'Accessing index out of bounds (use .at() for safety)',
      'Confusing size() with capacity()',
      'Using [] on an empty vector',
    ],
    realWorld: 'Shopping carts, todo lists, dynamic leaderboards — anywhere you need a list that grows.',
    timeComplexity: { access: 'O(1)', insert_end: 'O(1)*', insert_mid: 'O(n)', search: 'O(n)', delete: 'O(n)' },
    tip: 'Use reserve(n) to pre-allocate memory and avoid repeated reallocations when you know the approximate size.',
    quiz: [
      { q: 'Which method adds an element to the end of a vector?', opts: ['push_front()', 'push_back()', 'insert()', 'add()'], ans: 1 },
      { q: 'What does v.size() return?', opts: ['Capacity', 'Memory used', 'Number of elements', 'Max size'], ans: 2 },
      { q: 'How do you remove the last element?', opts: ['remove()', 'delete()', 'pop_back()', 'erase_back()'], ans: 2 },
      { q: 'What happens when vector runs out of capacity?', opts: ['It throws an error', 'It doubles capacity', 'It stops adding', 'It overwrites'], ans: 1 },
    ],
  },
  {
    id: 'stack',
    title: 'Stack',
    icon: '🥞',
    color: 'from-purple-500 to-violet-400',
    tagColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    category: 'Containers',
    difficulty: 'Beginner',
    description: 'Last In, First Out (LIFO) container. Like a stack of plates.',
    shortDesc: 'LIFO — Last In, First Out',
    header: 'stack',
    include: '#include <stack>',
    explanation: `A stack works exactly like a stack of plates. You always place a new plate on TOP, and you always remove from the TOP too. This is called LIFO — **Last In, First Out**.

Imagine you're washing dishes. You stack clean plates one by one. When you need a plate, you take the topmost one. The last plate you placed is the first one you use. That's a stack!`,
    syntax: `stack<type> name;
stack<int> s;
stack<string> words;`,
    code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;

    // Push elements
    s.push(10);
    s.push(20);
    s.push(30);

    cout << "Top: " << s.top() << endl;  // 30

    // Pop top element
    s.pop();
    cout << "After pop, top: " << s.top() << endl;  // 20

    cout << "Size: " << s.size() << endl;  // 2
    cout << "Empty? " << s.empty() << endl;  // 0 (false)

    // Empty the stack
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
    // Output: 20 10

    return 0;
}`,
    methods: [
      { name: 'push(val)', desc: 'Add element on top', complexity: 'O(1)' },
      { name: 'pop()', desc: 'Remove top element', complexity: 'O(1)' },
      { name: 'top()', desc: 'View top element', complexity: 'O(1)' },
      { name: 'size()', desc: 'Number of elements', complexity: 'O(1)' },
      { name: 'empty()', desc: 'Check if empty', complexity: 'O(1)' },
    ],
    useCases: [
      'Browser back/forward history',
      'Undo/Redo in text editors',
      'Checking balanced brackets',
      'Recursion simulation',
      'Expression evaluation (calculators)',
    ],
    mistakes: [
      'Calling top() or pop() on an empty stack (undefined behavior)',
      'Trying to access elements by index (not allowed in stack)',
    ],
    realWorld: 'Ctrl+Z (undo) in any editor, browser back button, and call stack in programming all use stacks.',
    timeComplexity: { push: 'O(1)', pop: 'O(1)', top: 'O(1)', size: 'O(1)', search: 'O(n)' },
    tip: 'Always check empty() before calling top() or pop() to avoid undefined behavior.',
    quiz: [
      { q: 'What does LIFO stand for?', opts: ['Last Index First Out', 'Last In First Out', 'List In First Out', 'Linked In First Out'], ans: 1 },
      { q: 'Which method lets you see the top element without removing it?', opts: ['peek()', 'front()', 'top()', 'get()'], ans: 2 },
      { q: 'What is printed: push(1), push(2), push(3), pop(), top()?', opts: ['1', '2', '3', 'Error'], ans: 1 },
      { q: 'Which real-world feature uses a stack?', opts: ['Search results', 'Email inbox', 'Undo button', 'Sort list'], ans: 2 },
    ],
  },
  {
    id: 'queue',
    title: 'Queue',
    icon: '🚶',
    color: 'from-green-500 to-emerald-400',
    tagColor: 'bg-green-500/15 text-green-600 dark:text-green-400',
    category: 'Containers',
    difficulty: 'Beginner',
    description: 'First In, First Out (FIFO) container. Like a queue at a ticket counter.',
    shortDesc: 'FIFO — First In, First Out',
    header: 'queue',
    include: '#include <queue>',
    explanation: `A queue works like a real-world queue (line of people). The first person who joins the line is the first person to be served. This is called FIFO — **First In, First Out**.

Think of a printer queue: the first document you sent to print is the first one printed. New jobs go to the back, and printing always happens from the front.`,
    syntax: `queue<type> name;
queue<int> q;
queue<string> tasks;`,
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;

    // Enqueue (push)
    q.push(10);
    q.push(20);
    q.push(30);

    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30

    // Dequeue (pop)
    q.pop();
    cout << "After pop, front: " << q.front() << endl;  // 20

    cout << "Size: " << q.size() << endl;  // 2

    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    // Output: 20 30

    return 0;
}`,
    methods: [
      { name: 'push(val)', desc: 'Add element at back', complexity: 'O(1)' },
      { name: 'pop()', desc: 'Remove front element', complexity: 'O(1)' },
      { name: 'front()', desc: 'View front element', complexity: 'O(1)' },
      { name: 'back()', desc: 'View back element', complexity: 'O(1)' },
      { name: 'size()', desc: 'Number of elements', complexity: 'O(1)' },
      { name: 'empty()', desc: 'Check if empty', complexity: 'O(1)' },
    ],
    useCases: [
      'Task scheduling (OS process queue)',
      'Printer spooler',
      'BFS (Breadth-First Search) in graphs',
      'Handling requests in a web server',
    ],
    mistakes: [
      'Calling front() or pop() on an empty queue',
      'Confusing push with enqueue terminology',
    ],
    realWorld: 'Customer service call centers, CPU task scheduling, and message queues in apps all use queues.',
    timeComplexity: { push: 'O(1)', pop: 'O(1)', front: 'O(1)', back: 'O(1)', search: 'O(n)' },
    tip: 'Use deque if you need to add/remove from both ends efficiently.',
    quiz: [
      { q: 'What does FIFO mean?', opts: ['First In First Out', 'Fast In Fast Out', 'First Index First Out', 'Fixed In Fixed Out'], ans: 0 },
      { q: 'Which method removes from the queue?', opts: ['remove()', 'top()', 'pop()', 'dequeue()'], ans: 2 },
      { q: 'Which method sees the first element?', opts: ['top()', 'front()', 'back()', 'first()'], ans: 1 },
      { q: 'Queue is used in BFS because it processes nodes in what order?', opts: ['Random', 'Depth-first', 'Level by level', 'Reverse'], ans: 2 },
    ],
  },
  {
    id: 'priority-queue',
    title: 'Priority Queue',
    icon: '👑',
    color: 'from-orange-500 to-amber-400',
    tagColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
    category: 'Containers',
    difficulty: 'Intermediate',
    description: 'Elements are served by priority, not arrival order. Highest value first by default.',
    shortDesc: 'Heap-based priority container',
    header: 'queue',
    include: '#include <queue>',
    explanation: `A priority queue is like a hospital emergency room. Patients are not served in the order they arrived — the most critical (highest priority) patient is treated first, regardless of when they came.

In C++ STL, priority_queue by default acts as a **max-heap**: the largest element always comes out first. You can flip it to a min-heap too.`,
    syntax: `// Max-heap (default)
priority_queue<int> pq;

// Min-heap
priority_queue<int, vector<int>, greater<int>> minpq;`,
    code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    // Max-heap (largest first)
    priority_queue<int> pq;

    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);

    cout << "Top: " << pq.top() << endl;  // 50

    pq.pop();
    cout << "After pop: " << pq.top() << endl;  // 30

    // Min-heap (smallest first)
    priority_queue<int, vector<int>, greater<int>> minpq;
    minpq.push(30);
    minpq.push(10);
    minpq.push(50);

    cout << "Min top: " << minpq.top() << endl;  // 10

    return 0;
}`,
    methods: [
      { name: 'push(val)', desc: 'Insert and reorder heap', complexity: 'O(log n)' },
      { name: 'pop()', desc: 'Remove top (max/min)', complexity: 'O(log n)' },
      { name: 'top()', desc: 'View highest priority element', complexity: 'O(1)' },
      { name: 'size()', desc: 'Number of elements', complexity: 'O(1)' },
      { name: 'empty()', desc: 'Check if empty', complexity: 'O(1)' },
    ],
    useCases: [
      "Dijkstra's shortest path algorithm",
      'Task scheduling by priority',
      'Finding k largest/smallest elements',
      'Huffman encoding (compression)',
    ],
    mistakes: [
      'Forgetting it uses max-heap by default (largest first)',
      'Trying to iterate over a priority_queue (not supported directly)',
    ],
    realWorld: 'Hospital triage systems, CPU scheduling, and route navigation apps (Dijkstra) use priority queues.',
    timeComplexity: { push: 'O(log n)', pop: 'O(log n)', top: 'O(1)', search: 'O(n)' },
    tip: 'To make a min-heap: priority_queue<int, vector<int>, greater<int>> pq;',
    quiz: [
      { q: 'What is the default behavior of priority_queue?', opts: ['Min-heap', 'FIFO', 'Max-heap', 'Sorted'], ans: 2 },
      { q: 'What is the time complexity of push in priority_queue?', opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], ans: 2 },
      { q: 'How do you create a min-heap?', opts: ['Use min_queue', 'Use less<int>', 'Use greater<int>', 'Use reverse()'], ans: 2 },
      { q: 'Which algorithm uses priority_queue?', opts: ['DFS', "Dijkstra's", 'BFS', 'Binary Search'], ans: 1 },
    ],
  },
  {
    id: 'set',
    title: 'Set',
    icon: '🔵',
    color: 'from-sky-500 to-blue-400',
    tagColor: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
    category: 'Containers',
    difficulty: 'Beginner',
    description: 'Sorted container with unique elements only. No duplicates allowed.',
    shortDesc: 'Sorted unique values',
    header: 'set',
    include: '#include <set>',
    explanation: `A set is a container that stores only unique values and keeps them automatically sorted. If you try to insert a duplicate, it simply ignores it.

Think of a set like a roll-call list — each student's name appears only once, and the list is alphabetically sorted. Inserting the same name again does nothing.`,
    syntax: `set<type> name;
set<int> s;
set<string> words;`,
    code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s;

    s.insert(30);
    s.insert(10);
    s.insert(20);
    s.insert(10);  // Duplicate, ignored!

    // Prints in sorted order: 10 20 30
    for (int x : s) cout << x << " ";

    cout << "\\nSize: " << s.size() << endl;  // 3

    // Check existence
    if (s.count(10)) cout << "10 found!\\n";
    if (s.find(99) == s.end()) cout << "99 not found!\\n";

    // Remove
    s.erase(10);
    for (int x : s) cout << x << " ";  // 20 30

    return 0;
}`,
    methods: [
      { name: 'insert(val)', desc: 'Insert (ignored if duplicate)', complexity: 'O(log n)' },
      { name: 'erase(val)', desc: 'Remove element', complexity: 'O(log n)' },
      { name: 'find(val)', desc: 'Return iterator to element', complexity: 'O(log n)' },
      { name: 'count(val)', desc: '1 if found, 0 if not', complexity: 'O(log n)' },
      { name: 'size()', desc: 'Number of elements', complexity: 'O(1)' },
      { name: 'empty()', desc: 'Check if empty', complexity: 'O(1)' },
      { name: 'begin()/end()', desc: 'Iterators', complexity: 'O(1)' },
    ],
    useCases: [
      'Removing duplicates from a list',
      'Checking membership quickly',
      'Maintaining a sorted list automatically',
      'Finding common/unique elements in two sets',
    ],
    mistakes: [
      'Expecting duplicates to be stored',
      'Trying to modify elements in-place (immutable in set)',
    ],
    realWorld: 'Unique user IDs, word dictionaries, and tag systems that prevent duplicates use sets.',
    timeComplexity: { insert: 'O(log n)', erase: 'O(log n)', find: 'O(log n)', count: 'O(log n)' },
    tip: 'Use unordered_set for O(1) average lookup if you don\'t need sorted order.',
    quiz: [
      { q: 'What happens if you insert a duplicate into a set?', opts: ['Error thrown', 'It gets stored twice', 'It is ignored', 'It replaces old value'], ans: 2 },
      { q: 'Is a set sorted automatically?', opts: ['No', 'Only if you sort manually', 'Yes, always', 'Only in descending order'], ans: 2 },
      { q: 'What is the time complexity of set::find()?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], ans: 1 },
      { q: 'Which method checks if an element exists in a set?', opts: ['exists()', 'has()', 'count()', 'lookup()'], ans: 2 },
    ],
  },
  {
    id: 'map',
    title: 'Map',
    icon: '🗺️',
    color: 'from-teal-500 to-green-400',
    tagColor: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
    category: 'Containers',
    difficulty: 'Intermediate',
    description: 'Key-value store with sorted keys and unique keys.',
    shortDesc: 'Sorted key-value pairs',
    header: 'map',
    include: '#include <map>',
    explanation: `A map stores data as key-value pairs, just like a real dictionary. Each word (key) has a definition (value). Keys are always unique and automatically sorted.

Think of a phone book: each name (key) maps to a phone number (value). You can't have two entries for the same name, and the entries are sorted alphabetically.`,
    syntax: `map<key_type, value_type> name;
map<string, int> age;
map<int, string> students;`,
    code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> age;

    // Insert
    age["Alice"] = 20;
    age["Bob"] = 22;
    age["Charlie"] = 19;

    // Access
    cout << "Alice's age: " << age["Alice"] << endl;  // 20

    // Sorted iteration (alphabetical by key)
    for (auto& p : age) {
        cout << p.first << ": " << p.second << "\\n";
    }
    // Alice: 20, Bob: 22, Charlie: 19

    // Check key exists
    if (age.count("Alice")) cout << "Alice found!\\n";

    // Erase
    age.erase("Bob");
    cout << "Size: " << age.size() << endl;  // 2

    return 0;
}`,
    methods: [
      { name: 'map[key] = val', desc: 'Insert or update', complexity: 'O(log n)' },
      { name: 'insert({k,v})', desc: 'Insert pair (won\'t update)', complexity: 'O(log n)' },
      { name: 'find(key)', desc: 'Returns iterator to key', complexity: 'O(log n)' },
      { name: 'count(key)', desc: '1 if key exists, else 0', complexity: 'O(log n)' },
      { name: 'erase(key)', desc: 'Remove by key', complexity: 'O(log n)' },
      { name: 'size()', desc: 'Number of pairs', complexity: 'O(1)' },
      { name: '.first / .second', desc: 'Access key and value', complexity: 'O(1)' },
    ],
    useCases: [
      'Word frequency counter',
      'Student grade book',
      'Configuration settings',
      'Caching results by ID',
    ],
    mistakes: [
      'Using [] to access a key that doesn\'t exist (creates it with default value!)',
      'Confusing .first (key) with .second (value)',
    ],
    realWorld: 'Database indexes, caches, configuration files, and vote counters all use map-like structures.',
    timeComplexity: { insert: 'O(log n)', erase: 'O(log n)', find: 'O(log n)', access: 'O(log n)' },
    tip: 'Accessing map["key"] when key doesn\'t exist will CREATE it with a default value. Use .count() first to check.',
    quiz: [
      { q: 'What does map store?', opts: ['Only keys', 'Only values', 'Key-value pairs', 'Sorted arrays'], ans: 2 },
      { q: 'What does map["newkey"] do if key doesn\'t exist?', opts: ['Returns null', 'Creates it with default', 'Throws error', 'Returns -1'], ans: 1 },
      { q: 'How do you access the key of a pair p?', opts: ['p.key', 'p.first', 'p.second', 'p[0]'], ans: 1 },
      { q: 'Are map keys sorted?', opts: ['No', 'Yes, always', 'Only integers', 'Only strings'], ans: 1 },
    ],
  },
  {
    id: 'unordered-map',
    title: 'Unordered Map',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-400',
    tagColor: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400',
    category: 'Containers',
    difficulty: 'Intermediate',
    description: 'Hash table based key-value store. Faster than map but unsorted.',
    shortDesc: 'Fast O(1) key-value lookup',
    header: 'unordered_map',
    include: '#include <unordered_map>',
    explanation: `An unordered_map is like a map, but instead of keeping keys sorted, it uses a **hash table** to store them. This makes lookups extremely fast — O(1) on average — but the order of elements is not guaranteed.

Choose unordered_map when you need speed and don't care about sorted order. Choose map when you need sorted keys.`,
    syntax: `unordered_map<key_type, value_type> name;
unordered_map<string, int> freq;`,
    code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> freq;

    // Count word frequencies
    string words[] = {"apple", "banana", "apple", "cherry", "banana", "apple"};
    for (string w : words) freq[w]++;

    // Print (order not guaranteed)
    for (auto& p : freq) {
        cout << p.first << ": " << p.second << "\\n";
    }
    // apple: 3, banana: 2, cherry: 1 (order may vary)

    // Fast lookup
    cout << "apple appears: " << freq["apple"] << " times\\n";

    if (freq.find("mango") == freq.end())
        cout << "mango not found\\n";

    return 0;
}`,
    methods: [
      { name: 'um[key] = val', desc: 'Insert or update', complexity: 'O(1) avg' },
      { name: 'find(key)', desc: 'Find element', complexity: 'O(1) avg' },
      { name: 'count(key)', desc: 'Check existence', complexity: 'O(1) avg' },
      { name: 'erase(key)', desc: 'Remove by key', complexity: 'O(1) avg' },
      { name: 'size()', desc: 'Number of pairs', complexity: 'O(1)' },
    ],
    useCases: [
      'Word frequency counting',
      'Caching / memoization',
      'Checking for duplicates quickly',
      'Implementing LRU cache',
    ],
    mistakes: [
      'Expecting elements to be in sorted order',
      'Hash collisions can cause O(n) worst case',
    ],
    realWorld: 'Hash tables power database indexes, caches, dictionaries, and compilers\' symbol tables.',
    timeComplexity: { insert: 'O(1)*', find: 'O(1)*', erase: 'O(1)*', note: '*average case' },
    tip: 'unordered_map is ~2-3x faster than map for lookups. Use it when order doesn\'t matter.',
    quiz: [
      { q: 'What is the average time complexity of unordered_map lookup?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], ans: 2 },
      { q: 'Is unordered_map sorted?', opts: ['Yes', 'No', 'Only by value', 'Only by key'], ans: 1 },
      { q: 'What data structure does unordered_map use internally?', opts: ['BST', 'Linked list', 'Hash table', 'Heap'], ans: 2 },
      { q: 'Which is faster for lookup: map or unordered_map?', opts: ['map', 'unordered_map', 'Equal', 'Depends on size'], ans: 1 },
    ],
  },
  {
    id: 'pair',
    title: 'Pair',
    icon: '👯',
    color: 'from-pink-500 to-rose-400',
    tagColor: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
    category: 'Utility',
    difficulty: 'Beginner',
    description: 'Groups two values of possibly different types together.',
    shortDesc: 'Two values bundled together',
    header: 'utility',
    include: '#include <utility>',
    explanation: `A pair simply bundles two values together. Think of it like an envelope with two items — they travel together and you access them as .first and .second.

Pairs are incredibly useful when a function needs to return two values, or when you want to sort coordinates, store key-value data temporarily, etc.`,
    syntax: `pair<type1, type2> p;
pair<int, string> p(1, "Alice");
auto p = make_pair(1, "Alice");`,
    code: `#include <iostream>
#include <utility>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Create pairs
    pair<int, string> p1 = {1, "Alice"};
    pair<int, string> p2 = make_pair(2, "Bob");

    cout << p1.first << ": " << p1.second << "\\n";  // 1: Alice
    cout << p2.first << ": " << p2.second << "\\n";  // 2: Bob

    // Sorting by first element automatically
    vector<pair<int,string>> students = {{3,"Charlie"},{1,"Alice"},{2,"Bob"}};
    sort(students.begin(), students.end());

    for (auto& s : students)
        cout << s.first << " " << s.second << "\\n";
    // 1 Alice, 2 Bob, 3 Charlie

    return 0;
}`,
    methods: [
      { name: '.first', desc: 'Access first element', complexity: 'O(1)' },
      { name: '.second', desc: 'Access second element', complexity: 'O(1)' },
      { name: 'make_pair(a, b)', desc: 'Create a pair', complexity: 'O(1)' },
    ],
    useCases: [
      'Returning two values from a function',
      'Storing (x, y) coordinates',
      'Sorting by key with extra data',
      'min/max with index tracking',
    ],
    mistakes: [
      'Using .key and .value instead of .first and .second',
      'Forgetting pair compares by first, then second',
    ],
    realWorld: 'Coordinates in maps, edge weights in graphs, and return values from functions use pairs.',
    timeComplexity: { access: 'O(1)', create: 'O(1)' },
    tip: 'Pairs sort by .first first, then .second. Use this for sorting with tie-breaking!',
    quiz: [
      { q: 'How do you access the second element of pair p?', opts: ['p[1]', 'p.value', 'p.second', 'p.get(1)'], ans: 2 },
      { q: 'What does make_pair(10, "hello") return?', opts: ['An array', 'A map entry', 'A pair<int, string>', 'A struct'], ans: 2 },
      { q: 'When sorting pairs, which element is compared first?', opts: ['.second', 'Random', '.first', 'Largest'], ans: 2 },
      { q: 'Pair can hold values of different types?', opts: ['No', 'Only numbers', 'Yes', 'Only if same size'], ans: 2 },
    ],
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    icon: '⚙️',
    color: 'from-indigo-500 to-purple-400',
    tagColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
    category: 'Algorithms',
    difficulty: 'Beginner',
    description: 'Built-in STL algorithms for sorting, searching, and transforming data.',
    shortDesc: 'sort, search, transform and more',
    header: 'algorithm',
    include: '#include <algorithm>',
    explanation: `The <algorithm> header gives you powerful ready-to-use functions that work on any STL container. Instead of writing your own sort or search, you just call sort() or find(). These are optimized, tested, and much faster to use than writing from scratch.`,
    syntax: `sort(v.begin(), v.end());
reverse(v.begin(), v.end());
find(v.begin(), v.end(), val);
binary_search(v.begin(), v.end(), val);
count(v.begin(), v.end(), val);
*max_element(v.begin(), v.end());
*min_element(v.begin(), v.end());`,
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // Sort ascending
    sort(v.begin(), v.end());
    // v = {1, 2, 3, 5, 8, 9}

    // Sort descending
    sort(v.begin(), v.end(), greater<int>());
    // v = {9, 8, 5, 3, 2, 1}

    // Reverse
    reverse(v.begin(), v.end());
    // v = {1, 2, 3, 5, 8, 9}

    // Find
    auto it = find(v.begin(), v.end(), 5);
    if (it != v.end()) cout << "Found 5 at index " << it - v.begin() << "\\n";

    // Binary search (vector must be sorted)
    cout << binary_search(v.begin(), v.end(), 8) << "\\n"; // 1 (true)

    // Count
    vector<int> u = {1, 2, 2, 3, 2};
    cout << count(u.begin(), u.end(), 2) << "\\n";  // 3

    // Max and Min
    cout << *max_element(v.begin(), v.end()) << "\\n";  // 9
    cout << *min_element(v.begin(), v.end()) << "\\n";  // 1

    return 0;
}`,
    methods: [
      { name: 'sort(b, e)', desc: 'Sort in ascending order', complexity: 'O(n log n)' },
      { name: 'sort(b, e, cmp)', desc: 'Sort with custom comparator', complexity: 'O(n log n)' },
      { name: 'reverse(b, e)', desc: 'Reverse a range', complexity: 'O(n)' },
      { name: 'find(b, e, v)', desc: 'Linear search, returns iterator', complexity: 'O(n)' },
      { name: 'binary_search(b,e,v)', desc: 'Check if value exists (sorted)', complexity: 'O(log n)' },
      { name: 'count(b, e, v)', desc: 'Count occurrences', complexity: 'O(n)' },
      { name: 'max_element(b, e)', desc: 'Iterator to maximum', complexity: 'O(n)' },
      { name: 'min_element(b, e)', desc: 'Iterator to minimum', complexity: 'O(n)' },
      { name: 'accumulate(b,e,init)', desc: 'Sum of elements', complexity: 'O(n)' },
      { name: 'unique(b, e)', desc: 'Remove consecutive duplicates', complexity: 'O(n)' },
    ],
    useCases: [
      'Sorting leaderboards',
      'Searching in databases',
      'Finding max/min scores',
      'Removing duplicates from sorted arrays',
    ],
    mistakes: [
      'Using binary_search on unsorted data (undefined behavior)',
      'Forgetting to dereference max_element/min_element (it returns iterator, not value)',
      'Using find() instead of binary_search on sorted data (much slower)',
    ],
    realWorld: 'Every app with sorting, searching, or filtering uses these algorithms under the hood.',
    timeComplexity: { sort: 'O(n log n)', find: 'O(n)', binary_search: 'O(log n)', reverse: 'O(n)' },
    tip: 'Always dereference max_element/min_element: *max_element(v.begin(), v.end())',
    quiz: [
      { q: 'What is the time complexity of sort()?', opts: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'], ans: 2 },
      { q: 'What must be true before using binary_search?', opts: ['Array must be empty', 'Array must be sorted', 'Array must have unique elements', 'Array must be a set'], ans: 1 },
      { q: 'What does max_element return?', opts: ['The maximum value', 'An index', 'An iterator', 'A boolean'], ans: 2 },
      { q: 'How do you sort in descending order?', opts: ['sort(b, e, less<int>())', 'sort_desc(b, e)', 'sort(b, e, greater<int>())', 'reverse_sort(b, e)'], ans: 2 },
    ],
  },
  {
    id: 'iterators',
    title: 'Iterators',
    icon: '🔄',
    color: 'from-cyan-500 to-teal-400',
    tagColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
    category: 'Concepts',
    difficulty: 'Intermediate',
    description: 'Pointers to STL container elements for traversal and manipulation.',
    shortDesc: 'Traverse containers uniformly',
    header: 'iterator',
    include: '// Built into all STL containers',
    explanation: `An iterator is like a cursor or pointer that points to elements inside a container. Think of it like a reading finger that moves through a book, pointing to one word at a time.

Every STL container has begin() (pointing to first element) and end() (pointing one past the last element). You can increment (++) an iterator to move forward, or dereference (*) it to get the value.`,
    syntax: `vector<int>::iterator it = v.begin();
auto it = v.begin();  // Modern way
*it      // Access value
++it     // Move forward
it + 2   // Jump ahead`,
    code: `#include <iostream>
#include <vector>
#include <list>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // Basic iterator
    vector<int>::iterator it;
    for (it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";  // 10 20 30 40 50
    }

    // Auto (cleaner)
    for (auto it = v.begin(); it != v.end(); ++it) {
        cout << *it << " ";
    }

    // Reverse iterator
    for (auto it = v.rbegin(); it != v.rend(); ++it) {
        cout << *it << " ";  // 50 40 30 20 10
    }

    // Position-based
    auto it2 = v.begin() + 2;
    cout << "\\nElement at index 2: " << *it2 << "\\n";  // 30

    // Modify via iterator
    *it2 = 99;
    cout << v[2] << "\\n";  // 99

    return 0;
}`,
    methods: [
      { name: 'begin()', desc: 'Iterator to first element', complexity: 'O(1)' },
      { name: 'end()', desc: 'Iterator past last element', complexity: 'O(1)' },
      { name: 'rbegin()', desc: 'Reverse iterator (last element)', complexity: 'O(1)' },
      { name: 'rend()', desc: 'Reverse iterator past first', complexity: 'O(1)' },
      { name: '++it', desc: 'Move to next element', complexity: 'O(1)' },
      { name: '*it', desc: 'Dereference (get value)', complexity: 'O(1)' },
      { name: 'it1 - it2', desc: 'Distance between iterators', complexity: 'O(1)' },
    ],
    useCases: [
      'Traversing any STL container uniformly',
      'Passing ranges to algorithms',
      'Erasing elements while iterating (with care)',
      'Implementing generic functions',
    ],
    mistakes: [
      'Comparing iterators from different containers',
      'Dereferencing end() iterator (undefined behavior)',
      'Invalidating iterators by modifying container during iteration',
    ],
    realWorld: 'Every range-based for loop, every STL algorithm uses iterators under the hood.',
    timeComplexity: { increment: 'O(1)', dereference: 'O(1)', distance: 'O(1) for random access' },
    tip: 'Use auto to simplify iterator type declarations. The range-based for loop automatically uses iterators!',
    quiz: [
      { q: 'What does v.begin() return?', opts: ['First element value', 'Iterator to first element', 'Size of vector', 'Last element'], ans: 1 },
      { q: 'How do you get the value an iterator points to?', opts: ['it.value()', '*it', 'it.get()', 'it[]'], ans: 1 },
      { q: 'What does v.end() point to?', opts: ['Last element', 'Element after last', 'NULL', 'Size'], ans: 1 },
      { q: 'Which iterator moves backwards?', opts: ['begin()', 'reverse()', 'rbegin()', 'back()'], ans: 2 },
    ],
  },
];

export const categories = ['All', 'Containers', 'Algorithms', 'Utility', 'Concepts'];

export const roadmap = [
  { step: 1, title: 'Start with Vector', desc: 'Master dynamic arrays first', topics: ['vector'] },
  { step: 2, title: 'Learn Stack & Queue', desc: 'Understand LIFO and FIFO', topics: ['stack', 'queue'] },
  { step: 3, title: 'Explore Set & Map', desc: 'Key-value and unique collections', topics: ['set', 'map'] },
  { step: 4, title: 'Master Algorithms', desc: 'Sort, search, transform', topics: ['algorithms'] },
  { step: 5, title: 'Advanced Topics', desc: 'Priority Queue, Unordered containers, Iterators', topics: ['priority-queue', 'unordered-map', 'iterators', 'pair'] },
];
