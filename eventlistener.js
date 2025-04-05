document.getElementById('divide').addEventListener("click", function () {
    let num1 = document.getElementById('num1').value;
    let num2 = document.getElementById('num2').value;
    try {
        let result = divide(num1, num2)
        document.getElementById('result').innerHTML = result
    } catch (error) {
        alert("Error: " + error)
    }
})