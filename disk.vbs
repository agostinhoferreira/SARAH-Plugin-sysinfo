'=========================================================================================================
' Crée un fichier .json des capacité disk, pour plugin sysinfo SARAH .
' disk.vbs
' Auteur: Ferreira Agostinho
' Version 1.02 Ne prent pas en compte les clefs USB
' Version 1.03 Création du fichier .json
'***********************************************************************************************************
' objet disk.
'===========================================================================================================
On Error Resume Next
'===========================================================================================================
Set fso = WScript.CreateObject("Scripting.FileSystemObject")
Set Drives = fso.Drives
'---- declaretion des variables 
Dim TotalFree,TotalSize,json_file,Drive_dd,Nb_disk
'---- 
json_file="{""disk"" :{" 
Nb_disk=1
For Each driveObject In Drives
   If driveObject.DriveLetter <> "A" and driveObject.DriveLetter <> "B"  Then
           	TotalSize = TotalSize + (driveObject.TotalSize / 1048576)
			TotalFree = TotalFree + (driveObject.FreeSpace / 1048576)
			'=============================================================
			json_file=json_file & """TotalSize" & driveObject.DriveLetter & """" & ":" & """" & round(TotalSize/1024,1) & " Gigabites" & ""","  
            json_file=json_file & """TotalFree" & driveObject.DriveLetter & """" & ":" & """" & round(TotalFree/1024,1) & " Gigabites" & """," 
			Nb_disk = Nb_disk +1
   End If
   
Next
			json_file=json_file & """Nbdisk""" & ":" & """" & Nb_disk -1 & """ "
'===========================================================================================================
 json_file=json_file & "} }"
'========================================================================================================== 
  fichier=".\plugins\sysinfo\disk.json"
  Set ficcmd = fso.CreateTextFile(fichier)
        ficcmd.writeline json_file
		ficcmd.close
'==========================================================================================================