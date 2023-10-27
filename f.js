    document.getElementById('xlsFileInput_SIAAMP').addEventListener('change', handleFile_SIAAMP);
    document.getElementById('xlsFileInput_CNAM').addEventListener('change', handleFile_CNAM);

    var arraySIAAMP = [];
    var arrayCNAM = [];

    function handleFile_CNAM(event) {
        const file = event.target.files[0]; if (file) {
            const reader = new FileReader(); reader.onload = function (e) {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet);

                const count = Object.keys(sheetData).length;
                for (i = 26; i <= count; i++) {
                    var jsonData = sheetData[i];
                    if (jsonData !== undefined) {
                        if (jsonData['ORACLE'] === "X1") {
                            var val = jsonData['__EMPTY'].replace('K"', '').replace('"', '');
                            val = val.toString();
                            arrayCNAM.push(val);
                        }
                    }
                }
                compareArrays();
            };
            reader.readAsArrayBuffer(file);
        }
    }
    function handleFile_SIAAMP(event) {
        const file = event.target.files[0]; if (file) {
            const reader = new FileReader(); reader.onload = function (e) {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = XLSX.utils.sheet_to_json(sheet);

                const count = Object.keys(sheetData).length;
                for (i = 0; i <= count; i++) {
                    var jsonData = sheetData[i];
                    if (jsonData !== undefined) {
                        var val = jsonData['IDNP'].toString();
                        if (val.length < 13)
                            val = '0' + val;
                        arraySIAAMP.push(val);
                    }
                }
                compareArrays();
            };
            reader.readAsArrayBuffer(file);
        }
    }

    function compareArrays() {
        if (arrayCNAM.length == 0) {
            alert('Incarca documentul din CNAM');
            return;
        }
        if (arraySIAAMP.length == 0) {
            alert('Incarca documentul din SIAAMP');
            return;
        }


        let difference = arrayCNAM.filter(x => !arraySIAAMP.includes(x));
        const textarea_CNAM = document.getElementById('IDNP_CNAM');
        textarea_CNAM.value = difference.join('\n');

        let difference1 = arraySIAAMP.filter(x => !arrayCNAM.includes(x));
        const textarea_SIAAMP = document.getElementById('IDNP_SIAAMP');
        textarea_SIAAMP.value = difference1.join('\n');

	document.getElementById('total_CNAM').innerText=arrayCNAM.length +'-'+difference1.length  ;
	document.getElementById('total_SIAAMP').innerText=arraySIAAMP.length +'-'+difference.length  ;
    }
