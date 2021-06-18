// Slider:
var slider = document.getElementById("slider");
var output = document.getElementById("output");
var element_size = 0;
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    element_size = this.value;
}

// Array creation
var container = document.getElementById("array");
var sort_algo = "";
  
/* Create blocks */
function generate_array() {
    // add new blocks
    for (var i = 0; i < 50; i++) {
        var value = Math.ceil(Math.random() * 100);
        
        var element = document.createElement("div");
        element.classList.add("block");
        element.style.height = `${value * 3}px`;
        element.style.transform = `translate(${i * 20}px)`;

        var element_value = document.createElement("label");
        element_value.classList.add("block_id");
        element_value.innerText = value;
  
        element.appendChild(element_value);
        container.appendChild(element);
    }
}

/* Swap two blocks */
function bubble_swap(element_1, element_2) {
    //
    return new Promise((resolve) => {
        // switch style
        var temp_style = element_1.style.transform;
        element_1.style.transform = element_2.style.transform;
        element_2.style.transform = temp_style;

        // wait a 4th of a second
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(element_2, element_1);
                resolve();
            }, 50);
        });
    });
}

/* Bubble Sort */
async function bubble_sort() {
    var blocks = document.querySelectorAll(".block");
  
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
  
            // Change comparison block color
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
  
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);
  
            // Compare two blocks
            if (value1 > value2) {
                await bubble_swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }
  
            // Revert comparison block color
            blocks[j].style.backgroundColor = "#3e8da8";
            blocks[j + 1].style.backgroundColor = "#3e8da8";
        }
  
        // Change blocks to complete stlye-color (green)
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }

}

// https://www.geeksforgeeks.org/quick-sort/?ref=leftbar-rightbar

/* */
function quick_partition(array, low, high) {

}

function quick_sort() {

}


function choose_algorithm(algorithm) {
    sort_algo = algorithm;
}

function visualize() {
    if (sort_algo == "bubble")
        bubble_sort();
}

generate_array();
