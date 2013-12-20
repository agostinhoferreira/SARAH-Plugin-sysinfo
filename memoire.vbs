'=========================================================================================================
' Crée un fichier .json de la mémoire utilisé, pour plugin sysinfo SARAH .
' mémoire.vbs
' Auteur: Ferreira Agostinho
'  Version 1.02 fichier .json
'  Version 1.03 supprime les services demarré dans le .json
' *******************************************************************************************************
'  objet = memoire.ram
'========================================================================================================
On Error Resume Next 
Set fso = CreateObject("Scripting.FileSystemObject")
 strComputer = "." 
Set objServices = GetObject( "winmgmts:{impersonationLevel=impersonate," & "authenticationLevel=pktPrivacy}!root/cimv2")
'=========================================================================================
' ----- requette db process pour conso mémoire ----------------
set objProcessSet = objServices.ExecQuery ("SELECT * FROM Win32_Process")
' --------- declaration variable ------------------------------ 
dim memoire,maximemoire,indexmemoire, nameservice , nbservice ,json_file , ramservice , ram_masque , dimm
'--------- compte la mémoire utilisé par process ---------------
 nbservice = 0
' ======================================================================================= 
' Debut fichier JSON
' -------------------------------------------------------------------------------------
json_file="{""Memoire"" :{" 
'========================================================================================
' Boucle de lecture service et programme qui tourne actuelement
'----------------------------------------------------------------------------------------
For Each Process in objProcessSet
    ramservice = Int(Process.WorkingSetSize)
	' avoir pour dectection du service qui utilise le plus de mémoire.
   	memoire = memoire + ramservice
	nbservice =  nbservice + 1
Next
'    json_file=json_file & """ServiceStart""" & ":" & """" & nbservice & """ }"  
'=======================================================================================
' Boucle de lecture memoire physique
' --------------------------------------------------------------------------------------
Set objWMIService = GetObject("winmgmts:" & "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")
'========= definition variables
maximemoire = 0
'========= requette base de données mémoire ===========================================
Set col = objWMIService.ExecQuery("Select * from Win32_PhysicalMemory",,48)
dimm = 1
For Each Item in col
	capa=Item.Capacity/1024/1024
	 maximemoire= maximemoire+capa
	'affiche le barrete mémoire debug
	json_file=json_file & """DIMM" & dimm & """" & ":" & """" &  capa & " Mo" & """," 
	dimm=dimm+1	
Next
	'---------------- requéte la mémoire total masquée
	'=================================================================================
	'-----------------------------------------------------------
	Set col = objWMIService.ExecQuery("Select * from Win32_OperatingSystem",,48)
		For Each Item in col
		ram_masque =int(Item.TotalVisibleMemorySize/1024)
	Next	
	'---------------- calcule la mémoire total et utilisé
	memoire = Round(memoire /1048576)
    indexmemoire = ram_masque /100
	
	json_file=json_file & """ServiceStart""" & ":" & """" & nbservice & """ ,"  
	json_file=json_file & """NbBarrette""" & ":" & """" &  (dimm-1) & ""","
	json_file=json_file & """RamMasquee""" & ":" & """" &  maximemoire-ram_masque & " Mo" & ""","
    json_file=json_file & """RamTotal""" & ":" & """" &  maximemoire & " Mo" & ""","  
	json_file=json_file & """RamUtilise""" & ":" & """" &   memoire  & " Mo" & ""","
    json_file=json_file & """RamUtilisePourcent""" & ":" & """" &   Round( memoire / indexmemoire,2)  &  """ " 
'========================================================================================
' Fin du fichier JSON
'---------------------------------------------------------------------------------------- 
 json_file=json_file & "} }"
'======================================================================================== 
' Sauvegarde le fichier JSON 
'========================================================================================
fichier=".\plugins\sysinfo\mem.json"
  Set ficcmd = fso.CreateTextFile(fichier)
		ficcmd.writeline json_file 
		ficcmd.close
