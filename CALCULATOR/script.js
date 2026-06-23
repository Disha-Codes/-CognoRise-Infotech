let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);

arr.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value == '=') {
            try {
                string = string.replace('×', '*').replace('÷', '/'); 
                const result = eval(string); 
                string+= "\n" + result; 
                document.getElementById('input-box').value = string;
            } catch {
                document.getElementById('input-box').value = "Error"; 
                string = "";
            }
        } else if (value == 'AC') {
            string = "";
            document.getElementById('input-box').value = string;
        } else if (value == 'DEL') {
            string = string.slice(0, -1); 
            document.getElementById('input-box').value = string;
        } else {
            string += value;
            document.getElementById('input-box').value = string;
        }
    });
});