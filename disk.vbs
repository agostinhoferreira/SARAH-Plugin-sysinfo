On Error Resume Next
'===========================================================================================================
Set fso = CreateObject("Scripting.FileSystemObject")
Set drives = fso.Drives
 
Dim TotalFree,TotalSize
 
For Each driveObject In drives
  If driveObject.DriveLetter <> "A" and driveObject.DriveLetter <> "B" Then
    TotalSize = TotalSize + (driveObject.TotalSize / 1048576)
    TotalFree = TotalFree + (driveObject.FreeSpace / 1048576)
  End If
Next
'===========================================================================================================
 fichier="diskt.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline round(TotalSize/1024,1) & " Gigabits"
		ficcmd.close

fichier="diskl.txt"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline round(TotalFree/1024,1) & " Gigabits"
		ficcmd.close		