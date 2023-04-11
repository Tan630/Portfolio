
all: ./source/index.html.php
# powershell.exe is necessary because the command is invoked on a remote Windows machine that has WSL installed.
# I can't afford to rent another virtual server so that's the best you get.
# Remove it if the script is running on a genuine Linux machine.
	powershell.exe php ./source/index.html.php > ./index.html
	powershell.exe php ./source/layout.css.php > ./styles/layout.css

index: ./source/index.html.php
	powershell.exe php ./source/index.html.php > ./index-raw.html
	tidy  --force-output y --indent n --vertical-space y --wrap 0 -xml --new-blocklevel-tags label --input-xml y -i index-raw.html > index.html
# A strange trick to bypass write restrictions on wsl shell.
	rm -f /tmp/index.html
	cp ./index.html /tmp
# These commands are to replace "expanded" self-closing tags.
# Such malformed tags are generated in the first place because PHPDom would otherwise yield malformed results.
# The same malformed results are processed by tidy, which is nevertheless able to clear unnecessary empty spaces,
# 	so that all such expanded tags follow a similar pattern, enabling easy find-and-replace with sed.
	sed -i -e 's/><\/img>/\/>/g' /tmp/index.html
	sed -i -e 's/><\/link>/\/>/g' /tmp/index.html
	sed -i -e 's/><\/input>/\/>/g' /tmp/index.html

# PHPDom makes use of libxml, which recognizes "scripts" as CDATA;
# 	as long as the output is produced by saveXML, the scripts are saved as such, which breaks
#   most browsers. This poor excuse of a regex attempts to remove those tags.
	sed -i -e 's/<!\[CDATA\[//g' /tmp/index.html
	sed -i -e 's/\]\]>//g' /tmp/index.html


#sed -i -e 's/\]\]>/FYBERPI/g' /tmp/index.html
	

	
	cat /tmp/index.html > ./index.html

style: ./source/layout.css.php 
# Compile layout.css
	powershell.exe php ./source/layout.css.php > ./styles/layout.css
	


doc: ./source/ ./source/lib/docgen.php
	powershell.exe php C:/Installations/PHP/phar/phpDocumentor.phar  ./source/
	powershell.exe php ./source/lib/docgen.php > uml.puml
	powershell.exe puml uml.puml

