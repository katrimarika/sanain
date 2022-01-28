#!/bin/bash

wordLength=5
xmlfile="kotus-sanalista_v1.xml"

tmpfile="words.txt"
grep '<s>' $xmlfile | sed "s@.*<s>\(.*\)</s>.*@\1@" > $tmpfile

selected=`grep -x "\w\{$wordLength\}" $tmpfile`

tsfile="words.ts"
echo "export const words$wordLength: string[] = " > $tsfile
node -e "console.log(JSON.stringify(process.argv[1].split('\n')))" "$selected" >> $tsfile

rm $tmpfile

node_modules/.bin/prettier --write --loglevel=silent $tsfile

dest="src/utils"
mv $tsfile $dest

echo "Done. Words of length $wordLength saved to $dest/$tsfile"
