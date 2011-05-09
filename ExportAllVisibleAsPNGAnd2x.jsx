
/***********************************************************************

PHOTOSHOP - LAYER EXPORT TOOL FOR NORMAL IPHONE GRAPHICS AND RETINA DISPLAY GRAPHICS.  

This script assumes you are working with high resolution graphics for the iPhone Retina display eg 960 x 640
Select the layer you want to export in the layers list in Photoshop.
1. Click this script (you might have to right click and choose Open With Photoshop, you can make this the default action in Finder by getting file info)
2. The script will ask you for the name that you want to save this layer as (without file extension, eg background)
3. The layer is trimmed of any transparent pixels, saved as name@2x.png and name.png in the same folder as oringal PSD document.

Hope you like this script, hit John Ballinger up on Twitter @sponno on from his website www.bluespark.co.nz

Please keep this Attribution here if you are going to redistrubte this code. Thanks
Creative Commons Attribution 3.0 New Zealand License
http://creativecommons.org/licenses/by/3.0/nz/     

************************************************************************/

//set unit preferences
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;


/////////////////////////////////////////////////////////////////////////////////////////////

//create a new slideshow package
function doResizeAndOutput()
{            
	var orginalDoc = app.activeDocument;
    orginalDoc.changeMode(ChangeMode.RGB);    
	// Get the new file name.
    var fileName = prompt("File Name, No extension, eg background", ""); 
	if(fileName==null) return; // You clicked cancel.
	
	// Image save options for PNG
    var pngOptions = new PNGSaveOptions();
	pngOptions.interlaced = false;
    
 	// Full Size - iPhone Retina Display Size and File Name.        
	activeDocument.saveAs(File(orginalDoc.path + "/" + fileName + "@2x.png"), pngOptions, true);        

	

   	// Half Size wich is actually normal size.
 	activeDocument.resizeImage(null,(app.activeDocument.height/2),(app.activeDocument.width/2),ResampleMethod.BICUBIC);
	activeDocument.saveAs(File(orginalDoc.path + "/" + fileName + ".png"), pngOptions, true);
	
	// undo document resize.
	var baseState = app.activeDocument.historyStates.length - 2;
	app.activeDocument.activeHistoryState = app.activeDocument.historyStates[baseState];
 
}      
      


//create the slideshow source files
doResizeAndOutput();
