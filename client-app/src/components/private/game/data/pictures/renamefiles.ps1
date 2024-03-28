# Get all files in the current directory
$files = Get-ChildItem -File

# Iterate over each file
foreach ($file in $files) {
    # Get the current file name
    $currentName = $file.Name

    # Check if the file name contains 'markeplace'
    if ($currentName -match 'markeplace') {
        # Replace 'markeplace' with 'marketplace'
        $newName = $currentName -replace 'markeplace', 'marketplace'

        # Rename the file
        Rename-Item -Path $file.FullName -NewName $newName
        Write-Output "Renamed $($file.FullName) to $newName"
    }
}
