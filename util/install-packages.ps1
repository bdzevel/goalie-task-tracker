Write-Host "This script must be run from the root";

do
{
	$result = Read-Host "Are you running this script from the root? [y/N]"
	if ($result -eq $null -or $result -eq "n" -or $result -eq "N")
	{
		Write-Host "Please run this script from the root";
		Exit 0;
	}
}
while ($result -ne "y" -and $result -ne "Y");

# Install all dependencies of the server
npm install;

# Install all dependencies of the front-end application
#	and move them to the appropriate location
cd .\app;
npm install;
rm -rf .\public\lib
rm -rf .\public\node_modules
Copy-Item .\node_modules .\public -R
Rename-Item .\public\node_modules lib
cd ..;

Exit 0;