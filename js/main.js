const txtAreaUTF = document.getElementById('txtarea__UTF8');
const formulario = document.getElementById('Formulario')
/* const encriptarUTF = document.getElementById('input__cifrar');
const desencriptarUTF = document.getElementById('input__descifrar'); */
const encriptarUTF = document.getElementById('input__cifrar');
const desencriptarUTF = document.getElementById('input__descifrar');
const txtDisplay = document.getElementById('txtDisplay__UTF8');
const btCopy = document.getElementById('btn__copy');


function decimalABinario(decimal){
    let numd = decimal
    let bit
    let binario = ""
    let intbinario

    do{
        bit = numd%2;
        let bitStr = bit.toString()
        binario = bitStr + binario;
        numd = parseInt(numd/2)
    } while(numd != 0)
    intbinario = parseInt(binario)

    return console.log(intbinario)
}

function decimalAHex(decimal){
    let numd = decimal
    let bit
    let hexadecimal = ""
    let intbinario
    const hexadecimalTable = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

    do{
        hex = numd%16;
        let hexStr = hexadecimalTable[hex].toString()
        hexadecimal = hexStr + hexadecimal;
        numd = parseInt(numd/16)
    } while(numd != 0)

    console.log(hexadecimal)

    return hexadecimal
}

function hexADecimal(hexavariable){

    console.log(`num hexadecimal ${hexavariable}`)

    let numh = hexavariable.toString()
    let hexarray
    let decimarray = []
    let resultarray = []
    let numero = 0
    const hexadecimalTable = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    let hexindex
    
    hexarray = numh.split('')
    console.log(`hexarray ${hexarray}`)
    hexarray = hexarray.reverse()
    console.log(`hexarray reverse ${hexarray}`)
    hexarray.forEach(element => {
        console.log(element)
        hexindex = hexadecimalTable.findIndex( (ind) => ind == element )
        console.log(`num hexindex ${hexindex}`)
        decimarray.push(hexindex)
    });
    console.log(decimarray)

    decimarray.forEach(element => {
        hexindex = decimarray.findIndex( (ind) => ind == element )
        resultarray.push(element*(Math.pow(16,hexindex)))
    })

    resultarray.forEach((element) => {
        numero = numero + element
    })
    console.log(resultarray)

    return numero
}

function getTxt(enviar){
    //encriptarUTF.onclick = (enviar) => {
        enviar.preventDefault()
        const textVar = txtAreaUTF.value
        console.log(textVar)
        const textArray = textVar.split("")
        console.log(textArray)

        return textArray
    //}
}

function encriptar(texto, claves){
    const cifrado = texto
    console.log(`cifrado ${cifrado}`)
    //let charCifrade
    texto.forEach((element) => {
        console.log(element)
        let txtIndex = cifrado.findIndex((index) => index == element)
        if(txtIndex){
            console.log(txtIndex)
        }else{
            txtIndex = 0
            console.log('cacahuate')
            console.log(txtIndex)
        }
        
        const charClave = claves.find(key => key.char == element)
        console.log(charClave)
        //const claveIndex = claves.findIndex((index) => index == element)

        const charCifrade = decimalAHex(charClave.id)
        cifrado[txtIndex] = charCifrade
        
        //cifrado[txtIndex] = charCifrade
    })
    
    return cifrado
    //console.log(cifrado)
}

function desencriptar(array, claves){
    //const codeArray = array.filter((element) => element != ",")
    const codeArray = []
    const idArray = []
    let char = ''
    let mensaje = ''
    console.log(array)
    //console.log(codeArray)

    array.forEach((element) => {
        
        if(element != ","){
            char = char + element
            char = char.toString()
        }else{
            codeArray.push(char)
            char = ''
            //codeArray.push(element)
        }
        console.log(`array ${element}`)
        
    })
    codeArray.push(char)

    console.log(codeArray)
    codeArray.forEach((element) => {
        let id = hexADecimal(element)
        console.log(`id = ${id}`)
        idArray.push(id)
    })
    console.log(idArray)
    idArray.forEach((element) => {
        const objeto = claves.find((key) => key.id == element)
        mensaje = mensaje + objeto.char
    })
    console.log(mensaje)

    return mensaje
}
function copyTxt(enviar) {  
    enviar.preventDefault()
    navigator.clipboard.writeText(txtDisplay.innerHTML)
    // Select the text field
    /* txtDisplay.select();
    txtDisplay.setSelectionRange(0, 99999); // For mobile devices */
  
     // Copy the text inside the text field
    /* navigator.clipboard.writeText(txtDisplay.value); */
  
    // Alert the copied text
    alert("Copied the text: " + txtDisplay.innerHTML);
}
hexADecimal('F1')
/* decimalABinario(241)
decimalAHex(241)
//hexADecimal('F1')

console.log(parseInt(1/2))

const caca = "hola mundo"
let variable = caca.split("")
console.log(variable) */

//encriptarUTF.onclick = getTxt()
//encriptar(getTxt())
//getTxt()
let claves
let arrCifrado
fetch("js/claves.json")
    .then((resp) => {

        if(!resp.ok){
            throw {
                ok:false,
                msg: "Error 404, no fue posible cargar el contenido"
            }
        }
        return resp.json()
    })
    .then((resp) => {
        claves = resp.utf8
        console.log(claves)

        return claves
    })
    .then((resp) => {
        //////////////// onclick
        /* const txtArr = getTxt()
        if(txtArr){
            console.log(`HOLAAA ${txtArr}`)
            encriptar(txtArr, claves)
        } */
        let arrayCrypted
        encriptarUTF.onclick = (enviar) => {
            arrCifrado = getTxt(enviar)
            console.log(`arrCifrado ${arrCifrado}`)
            console.log(arrCifrado)
            arrayCrypted = encriptar(arrCifrado, claves)
            console.log(arrayCrypted)
            const msgCrypted = arrayCrypted.toString() ///////////imprimir mensaje
            txtDisplay.innerHTML = msgCrypted
            
            return arrayCrypted
        }
        desencriptarUTF.onclick = (enviar) => {
            const codigo = getTxt(enviar)
            console.log(codigo)
            const descifrado = desencriptar(codigo, claves)
            txtDisplay.innerHTML = descifrado
        }
        btCopy.onclick = (enviar) => {
            copyTxt(enviar)
        }
        

        //return txtArr
    })
    /* .then((resp) => {
        console.log(resp)
        console.log(`RESP ${resp}`)
        encriptar(resp, claves)
    }) */
    .catch((err) => console.log(err))