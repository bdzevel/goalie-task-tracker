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
bower install;

# Install all dependencies of the front-end application
#	and move them to the appropriate location
cd .\app;
npm install;
cd ..;

Exit 0;