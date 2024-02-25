import stringHash from "string-hash"

// generate a bit array of the given size with the given number stored in binary (bit order right to left) 
const generateBitArrayFromNumber = (number, bitCount) => {
    let mutatedNumber = number // subtract as bits are calculated

    const bitArray = new Array(bitCount).fill(0)

    for(let i = 0;i<bitCount;i++){
        const bitOffset = (bitCount - 1) - i // bits are read right to left

        const bitAtOffsetShouldBeTrue = (mutatedNumber / 2) % 1 != 0

        if(bitAtOffsetShouldBeTrue){
            bitArray[bitOffset] = 1

            mutatedNumber--
        }

        mutatedNumber /= 2
    }

    return bitArray
}

// generate a number from the base2 data in the given bit array (bit order right to left)
const generateNumberFromBitArray = (bitArray) => {
    let number = 0

    for(let i = 0;i<bitArray.length;i++){
        const power = Math.pow(2, i)

        const bitOffset = (bitArray.length - 1) - i // bits are read from right to left

        number += power * bitArray[bitOffset]
    }

    return number
}

// generate a bit array representing the given character in custom base6
const generateBitArrayFromCharacter = (char) => {
    const alphabetChars = "abcdefghijklmnopqrstuvwxyz"
    const alphabetOffset = 0
    
    const numericChars = "0123456789"
    const numericOffset = alphabetOffset + alphabetChars.length

    const symbolChars = ",.!?()\'\" "
    const symbolOffset = numericOffset + numericChars.length

    let numberValue = Math.pow(2, 6) - 1 // unknown character

    if(alphabetChars.includes(char)){
        numberValue = alphabetOffset + alphabetChars.indexOf(char)
    } else if(numericChars.includes(char)){
        numberValue = numericOffset + numericChars.indexOf(char)
    } else if(symbolChars.includes(char)){
        numberValue = symbolOffset + symbolChars.indexOf(char)
    }

    return generateBitArrayFromNumber(numberValue, 6)
}

// generate a character from the custom base6 data in the given bit array
const generateCharacterFromBitArray = (bitArray) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789,.!?()\'\" "

    const charCode = generateNumberFromBitArray(bitArray)

    if(charCode < chars.length){
        return chars[charCode]
    } else {
        // unknown character
        // technically we should validate that charCode is 2**6 - 1 but it doesn't really matter
        return '\u25A1'
    }
}

// format string for 6bit storage
const encodeString = (string) => {
    const lowercase = string.toLowerCase()
    const spacesMerged = lowercase.replace(/\s\s+/g, " ")

    let punctuationSpacesRemoved = spacesMerged

    const punctuationMarks = [",", ".", "!", "?"]

    punctuationMarks.forEach(punctuationMark => {
        punctuationSpacesRemoved = punctuationSpacesRemoved.split(punctuationMark).map(s => s.trim()).join(punctuationMark)
    })
    
    return punctuationSpacesRemoved
}

// format string after 6bit storage
const decodeString = (string) => {
    const withSpacesAfterCommas = string.split(",").map((s, index) => index == 0 ? s : " " + s).join(",")

    let withSentenceFormatting = withSpacesAfterCommas

    const sentenceDelimiters = [".", "!", "?"]

    sentenceDelimiters.forEach(sentenceDelimiter => {
        withSentenceFormatting = withSentenceFormatting.split(sentenceDelimiter).map((s, index) => {
            if (s.length == 0) return ""

            s = s.slice(0, 1).toUpperCase() + s.slice(1)

            return index == 0 ? s : " " + s
        }).join(sentenceDelimiter)
    })

    return withSentenceFormatting
}

// generate a bit array representing the given string stored in a base8 size header and custom base6 chars
const generateBitArrayFromString = (string) => {
    const encodedString = encodeString(string)

    const sizeBitArray = generateBitArrayFromNumber(encodedString.length, 8)

    const characterBitArrays = []

    for(let i = 0;i<encodedString.length;i++){
        const char = encodedString[i]

        characterBitArrays.push(generateBitArrayFromCharacter(char))
    }

    const stringBitArray = [sizeBitArray, ...characterBitArrays].flat()

    return stringBitArray
}

// generate a string from the custom base6 data in the given bit array
// bit array should not include the base8 size header
const generateStringFromBitArray = (bitArray) => {
    const chars = []

    for(let i = 0;i<bitArray.length / 6;i++){
        const charOffset = 6 * i

        const charBitArray = []

        for(let j = 0;j<6;j++){
            const bitOffset = j

            charBitArray.push(bitArray[charOffset + bitOffset])
        }

        chars.push(generateCharacterFromBitArray(charBitArray))
    }

    return decodeString(chars.join(""))
}

// generate a bit array from the hash of the given form
const generateBitArrayFromFormHash = (form) => {
    const hashInput = JSON.stringify(form)

    const hashOutput = stringHash(hashInput)

    return generateBitArrayFromNumber(hashOutput, 32)
}

// generate a bit array from the given value and data type identifier
const generateBitArrayFromValueAndType = (value, type) => {
    if(type == "boolean"){
        return [ value ? 1 : 0 ]
    } else if(type == "string"){
        return generateBitArrayFromString(value)
    } else if(type == "1bit"){
        return generateBitArrayFromNumber(value, 1)
    } else if(type == "2bit"){
        return generateBitArrayFromNumber(value, 2)
    } else if(type == "4bit"){
        return generateBitArrayFromNumber(value, 4)
    } else if(type == "6bit"){
        return generateBitArrayFromNumber(value, 6)
    } else if(type == "8bit"){
        return generateBitArrayFromNumber(value, 8)
    }
}

// generate a value from the given bit array and data type identifier
const generateValueFromBitArrayAndType = (bitArray, type) => {
    if(type == "boolean"){
        return bitArray[0] == 1
    } else if(type == "string"){
        return generateStringFromBitArray(bitArray)
    } else if(type == "1bit" || type == "2bit" || type == "4bit" || type == "6bit" || type == "8bit" || type == "16bit"){
        return generateNumberFromBitArray(bitArray)
    }
}

// generate a bit array from the given data
const generateBitArrayFromData = (data) => {
    const hashBitArray = generateBitArrayFromFormHash(data.form)

    const idBitArray = generateBitArrayFromNumber(data.id, 16)

    const entryBitArrays = [] // array of bit arrays for each entry in the data

    if (data.entries.length != data.form.length) throw new Error("Expected data and form to be the same size")

    for(let i = 0;i<data.entries.length;i++){
        const value = data.entries[i]
        const type = data.form[i].dataType

        entryBitArrays.push(generateBitArrayFromValueAndType(value, type))
    }

    const bitArray = [hashBitArray, idBitArray, ...entryBitArrays].flat()

    return bitArray
}

// generate data from the given bit array and form
const generateDataFromBitArray = (bitArray, form) => {
    const hash = generateNumberFromBitArray(bitArray.splice(0, 32))
    const expectedHash = generateNumberFromBitArray(generateBitArrayFromFormHash(form))

    if (hash != expectedHash) return null

    const id = generateNumberFromBitArray(bitArray.splice(0, 16))

    const entries = []

    for(let i = 0;i<form.length;i++){
        const type = form[i].dataType

        let entrySize = 0

        if(type == "boolean"){
            entrySize = 1
        } else if(type == "string"){
            const stringSizeHeader = bitArray.splice(0, 8)
            
            entrySize = 6 * generateNumberFromBitArray(stringSizeHeader)
        } else if(type == "1bit"){
            entrySize = 1
        } else if(type == "2bit"){
            entrySize = 2
        } else if(type == "4bit"){
            entrySize = 4
        } else if(type == "6bit"){
            entrySize = 6
        } else if(type == "8bit"){
            entrySize = 8
        } else if(type == "16bit"){
            entrySize = 16
        }

        const entryBitArray = bitArray.splice(0, entrySize)
        const entryValue = generateValueFromBitArrayAndType(entryBitArray, type)

        entries.push(entryValue)
    }

    return {
        id,
        entries
    }
}

// convert the given bit array to an array of bytes (byte order left to right, bit order right to left)
const bitArrayToBuffer = (bitArray) => {
    const bytes = []

    // pad to make sure last byte is full
    const paddingNeeded = 8 - (bitArray.length % 8)

    for(let i = 0;i<paddingNeeded;i++){
        bitArray.push(0)
    }

    for(let i = 0;i<bitArray.length / 8;i++){
        const byteOffset = 8 * i

        const byteBitArray = []

        for(let j = 0;j<8;j++){
            const bitOffset = j

            byteBitArray.push(bitArray[byteOffset + bitOffset])
        }
        
        bytes.push(generateNumberFromBitArray(byteBitArray))
    }

    return String.fromCharCode(...bytes)
}

// convert the given buffer of bytes to an array of bits (byte order left to right, but order right to left)
const bufferToBitArray = (buffer) => {
    const byteArray = []

    for(let i = 0;i<buffer.length;i++){
        byteArray.push(generateBitArrayFromNumber(buffer[i], 8))
    }
    
    const bitArray = byteArray.flat()

    return bitArray
}

// generate a buffer from the given data
const generateBufferFromData = (data) => {
    const buffer = bitArrayToBuffer(generateBitArrayFromData(data))

    return buffer
}

// generate data from the given buffer and form
const generateDataFromBuffer = (buffer, form) => {
    const bitArray = bufferToBitArray(buffer)

    const data = generateDataFromBitArray(bitArray, form)

    return data
}

export {
    generateBufferFromData,
    generateDataFromBuffer
}