// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const PV= require('bio-pv/bio-pv.min.js')

var pv = PV

var viewer = pv.Viewer(document.getElementById('viewer'), 
                           { quality : 'medium', width: 'auto', height : 'auto',
                             antialias : true, outline : true});
    var structure;
    function lines() {
      viewer.clear();
      viewer.lines('structure', structure);
    }
    function cartoon() {
      viewer.clear();
      viewer.cartoon('structure', structure, { color: color.ssSuccession() });
    }
    function lineTrace() {
      viewer.clear();
      viewer.lineTrace('structure', structure);
    }
    function sline() {
      viewer.clear();
      viewer.sline('structure', structure);
    }

    function tube() {
      viewer.clear();
      viewer.tube('structure', structure);
    }

    function trace() {
      viewer.clear();
      viewer.trace('structure', structure);
    }
    function preset() {
      viewer.clear();
      var ligand = structure.select({rnames : ['RVP', 'SAH']});
      viewer.ballsAndSticks('ligand', ligand);
      viewer.cartoon('protein', structure);
    }
    function load(pdb_id) {
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://files.rcsb.org/view/4UBB.pdb');
      xhr.setRequestHeader('Content-type', 'application/x-pdb');
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          structure = pv.io.pdb(xhr.responseText);
          preset();
          viewer.centerOn(structure);
        }
        
      }
      xhr.send();
    }
    function transferase() {
      load('1r6a');
    }
    
    window.onresize = function(event) {
      viewer.fitParent();
    }
    document.addEventListener('DOMContentLoaded', transferase);


