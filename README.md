### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ans: getElementById just take single element and id name is unique, return single element or null.
ans: getElementsByClassName take, all same class name element and return html collections and it change when dom change .
ans: querySelector, if the several class name is same , querySelector take only the first element of them , and it return single element or null.
ans: querySelectorAll , it takes all matching element , return node list and it does not change when dom is change this is called static.

### 2. How do you create and insert a new element into the DOM?

ans: document.createElement() way to create and can add style and attribute , we can set by append(), prepend() .
ans: const div = document.createElement("div");
div.innerText = "Hello";
document.body.append(div);

### 3. What is Event Bubbling? And how does it work?

ans: when any event active in child element that goes up like parent then grandparent;

### 4. What is Event Delegation in JavaScript? Why is it useful?

ans: setting a event listener in parent then controlling the child to handle them . it take element like event.target and it event listener less.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

ans: preventDefault() stops the default behavior of browser, like when any form submit and then reload stop.
ans: stopPropagation() it stops the bubbling to parent.
