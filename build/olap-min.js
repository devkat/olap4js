function object(e){function t(){}return t.prototype=e,new t}function inheritPrototype(e,t){var n=object(t.prototype);n.constructor=e,e.prototype=n}(function e(t){var e;typeof exports!="undefined"?e=exports:e=t.olap={},e.Connection=function(n){var r={},i=this;this.sources=[];if(n instanceof Object&&n.sources instanceof Array)for(var s in n.sources)r=n.sources[s],this.addDataSource(r);this.id=e.Connection.id++,e.Connection.instances[this.id]=this},e.Connection.id=1,e.Connection.prefix="olap.Connection",e.Connection.instances={},e.Connection.getInstance=function(t){return e.Connection.instances[t]},e.Connection.prototype={getOlapDatabases:function(t){return this.sources.length==0?this.fetchOlapDatasources(function(e){t&&typeof t=="function"&&t.call(this,e)}):t&&typeof t=="function"&&t.call(this,this.sources),this.sources},fetchOlapDatasources:function(t){throw new Error("You must provide an implementation for: "+arguments.callee.name)},addDataSource:function(n,r){return n instanceof Object&&n instanceof e.Datasource==0&&(n=new e.Datasource(n,this)),this.sources.push(n),r&&typeof r=="function"&&r.call(this,n),n},executeOlapQuery:function(n){return console.warn("Default execute being used"),new e.CellSet({})},getCubes:function(t){var n,r,i,s,o,u,a,f=[];this.getOlapDatabases(function(e){for(n in e){i=e[n],s=i.getCatalogs();for(r in s)o=s[r],u=o.getCubes(),f=f.concat(u)}if(typeof t!="function")return f;t.call(this,f)})},getLevels:function(t){var n=function(t){var n,r,i,s,o,u,a,f,l,c,h,p,d=[];for(n in t){r=t[n],i=r.getCatalogs();for(n in i){s=i[n],o=s.getCubes();for(n in o){u=o[n],measures=u.getMeasures();for(n in measures)measure=measures[n];a=u.getDimensions();for(n in a){f=a[n],c=f.getHierarchies();for(n in c)l=c[n],h=l.getLevels(),d=d.concat(h)}}}}return d};this.getOlapDatabases(function(e){var r=n(e);if(typeof t!="function")return r;t.call(this,r)})}},e.Datasource=function(n,r){this.catalogs=[];if(n instanceof Object){this.DATA_SOURCE_DESCRIPTION=n.DATA_SOURCE_DESCRIPTION||"",this.DATA_SOURCE_NAME=n.DATA_SOURCE_NAME||"",this.DATA_SOURCE_INFO=n.DATA_SOURCE_INFO||"",this.PROVIDER_NAME=n.PROVIDER_NAME||"",this.PROVIDER_TYPE=n.PROVIDER_TYPE||"",this.URL=n.URL||"",this.AUTHENTICATION_MODE=n.AUTHENTICATION_MODE||"";if(n.catalogs instanceof Array)for(var i in n.catalogs)cat=n.catalogs[i],this.addCatalog(cat)}this.connection=r,this.id=e.Datasource.id++,e.Datasource.instances[this.id]=this},e.Datasource.id=1,e.Datasource.instances={},e.Datasource.prefix="olap.Datasource",e.Datasource.getInstance=function(t){return e.Datasource.instances[t]},e.Datasource.prototype={getOlapConnection:function(){return this.connection},getName:function(){return this.DATA_SOURCE_NAME},getDescription:function(){return this.DATA_SOURCE_DESCRIPTION},getProviderName:function(){return this.PROVIDER_NAME},getURL:function(){return this.URL},getDataSourceInfo:function(){return this.DATA_SOURCE_INFO},getProviderTypes:function(){return this.PROVIDER_TYPE},getAuthenticationModes:function(){return this.AUTHENTICATION_MODE},getCatalogs:function(){return this.catalogs.length==0&&this.fetchCatalogs(),this.catalogs},fetchCatalogs:function(){},addCatalog:function(n,r){return n instanceof Object&&n instanceof e.Catalog==0&&(n=new e.Catalog(n,this)),this.catalogs.push(n),typeof r=="function"&&r(n),n}},e.Catalog=function(n,r){var i=n||{cubes:[]};this.CATALOG_NAME=i.CATALOG_NAME||"",this.DATE_MODIFIED=i.DATE_MODIFIED||"",this.DESCRIPTION=i.DESCRIPTION||"",this.ROLES=i.ROLES||[],this.cubes=[];if(i.cubes instanceof Array)for(var s in i.cubes){var o=i.cubes[s];this.addCube(o)}this.datasource=r,this.id=e.Catalog.id++,e.Catalog.instances[this.id]=this},e.Catalog.id=1,e.Catalog.instances={},e.Catalog.prefix="olap.Catalog",e.Catalog.getInstance=function(t){return e.Catalog.instances[t]},e.Catalog.prototype={getName:function(){return this.CATALOG_NAME},getSchemas:function(){return this.schemas},getDatabase:function(){return this.datasource},addCube:function(n,r){return n instanceof Object&&n instanceof e.Cube==0&&(n=new e.Cube(n,this)),this.cubes.push(n),typeof r=="function"&&r(n),n},getCubes:function(){return this.cubes.length==0&&this.fetchCubes(),this.cubes},fetchCubes:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)}},e.Cube=function(n,r){var i=n||{};this.CUBE_NAME=i.CUBE_NAME||"",this.CUBE_TYPE=i.CUBE_TYPE||"CUBE",this.DESCRIPTION=i.DESCRIPTION||"",this.IS_DRILLTHROUGH_ENABLED=i.IS_DRILLTHROUGH_ENABLED=="true"?!0:!1,this.IS_LINKABLE=i.IS_LINKABLE=="true"?!0:!1,this.IS_SQL_ENABLED=i.IS_SQL_ENABLED=="true"?!0:!1,this.IS_WRITE_ENABLED=i.IS_WRITE_ENABLED=="true"?!0:!1,this.LAST_SCHEMA_UPDATE=i.LAST_SCHEMA_UPDATE||"",this.sets=[],this.measures=[],this.dimensions=[],this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.catalog=r||{},this.id=e.Cube.id++,e.Cube.instances[this.id]=this},e.Cube.id=1,e.Cube.instances={},e.Cube.prefix="olap.Cube",e.Cube.getInstance=function(t){return e.Cube.instances[t]},e.Cube.getInstanceByName=function(t,n){var r=e.Cube.instances,i;for(i in r)if(r[i].getName()==t&&r[i].CATALOG_NAME==n)return r[i];return null},e.Cube.prototype={getSchema:function(){return this.SCHEMA_NAME},getName:function(){return this.CUBE_NAME},getDescription:function(){return this.DESCRIPTION},addDimension:function(n,r){return n instanceof Object&&(n instanceof e.Dimension==0&&(n=new e.Dimension(n,this)),this.dimensions.push(n),typeof r=="function"&&r(n)),n},addMeasure:function(n,r){return n instanceof Object&&(n instanceof e.Measure==0&&(n=new e.Measure(n,this)),this.measures.push(n),typeof r=="function"&&r(n)),n},getHierarchyByUniqueName:function(t){console.debug("func Call: "+arguments.callee.name),console.debug(t);for(var n=0,r=this.dimensions.length;n<r;n++){var i=this.dimensions[n];for(var s=0,o=i.hierarchies.length;s<o;s++){var u=i.hierarchies[s];if(u.HIERARCHY_UNIQUE_NAME==t)return u}}throw new Error("no match for: "+LEVEL_UNIQUE_NAME+":"+HIERARCHY_NAME)},getLevelByUniqueName:function(t,n){console.debug("func Call: "+arguments.callee.name),console.debug(t+":"+n);if(n=="Measures")return{LEVEL_UNIQUE_NAME:t,HIERARCHY_UNIQUE_NAME:n};for(var r=0,i=this.dimensions.length;r<i;r++){var s=this.dimensions[r];for(var o=0,u=s.hierarchies.length;o<u;o++){var a=s.hierarchies[o];if(a.HIERARCHY_NAME==n)for(var f=0,l=a.levels.length;f<l;f++){var c=a.levels[f];if(c.LEVEL_UNIQUE_NAME==t)return c}}}throw new Error("no match for: "+t+":"+n)},getMeasures:function(){return this.measures.length==0?this.fetchMeasures():this.measures},fetchMeasures:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)},getDimensions:function(){if(this.dimensions.length!=0)return this.dimensions;var t=function(t){return this.dimensions};this.fetchDimensions(t)},getHierarchies:function(){var t=this.getDimensions();if(t.length!==0){var n,r,i=[];for(n=0,j=t.length;n<j;n++)r=t[n].getHierarchies(),i=i.concat(r);return i}return[]},fetchDimensions:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)},getMetadata:function(){var t,n,r,i,s,o,u,a,f,l,c={};r=this.getDimensions();for(t in r){i=r[t],o=i.getHierarchies();for(n in o)s=o[n],u=s.getLevels()}return c.dimensions=r,c.measures=this.getMeasures(),c}},e.Measure=function(n,r){var i=n||{};this.DATA_TYPE=i.DATA_TYPE||0,this.DEFAULT_FORMAT_STRING=i.DEFAULT_FORMAT_STRING||"",this.DESCRIPTION=i.DESCRIPTION||"",this.MEASURE_AGGREGATOR=i.MEASURE_AGGREGATOR||0,this.MEASURE_IS_VISIBLE=i.MEASURE_IS_VISIBLE||!1,this.MEASURE_NAME=i.MEASURE_NAME||"",this.MEASURE_UNIQUE_NAME=i.MEASURE_UNIQUE_NAME||"",this.CUBE_NAME=i.CUBE_NAME,this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.cube=r,this.id=e.Measure.id++,e.Measure.instances[this.id]=this},e.Measure.id=1,e.Measure.instances={},e.Measure.prefix="olap.Measure",e.Measure.getInstance=function(t){return e.Measure.instances[t]},e.Measure.validMethods=["Value"],e.Measure.sugarMethods=["Self"],e.Measure.isBasicMethod=function(e){var t;for(t in this.validMethods)if(this.validMethods[t]==e)return!0},e.Measure.isMethodValid=function(e){if(this.isBasicMethod(e)==1)return!0;var t;for(t in this.sugarMethods)if(this.sugarMethods[t]==e)return!0;return!1},e.Measure.prototype={toMDX:function(n,r){return e.Measure.isBasicMethod(n)?this.getUniqueName()+"."+n:n=="Self"?this.getUniqueName():""},getHierarchy:function(){return new e.Hierarchy({HIERARCHY_NAME:"Measures",HIERARCHY_UNIQUE_NAME:"[Measures]"})},getName:function(){return this.MEASURE_NAME},getUniqueName:function(){return this.MEASURE_UNIQUE_NAME}},e.Dimension=function(n,r){var i=n||{};this.DEFAULT_HIERARCHY=i.DEFAULT_HIERARCHY||"",this.DESCRIPTION=i.DESCRIPTION||"",this.DIMENSION_CAPTION=i.DIMENSION_CAPTION||"",this.DIMENSION_CARDINALITY=i.DIMENSION_CARDINALITY||0,this.DIMENSION_GUID=i.DIMENSION_GUID||"",this.DIMENSION_IS_VISIBLE=i.DIMENSION_IS_VISIBLE=="true"?!0:!1,this.DIMENSION_NAME=i.DIMENSION_NAME||"",this.DIMENSION_ORDINAL=i.DIMENSION_ORDINAL||0,this.DIMENSION_TYPE=i.DIMENSION_TYPE||0,this.DIMENSION_UNIQUE_NAME=i.DIMENSION_UNIQUE_NAME||"",this.DIMENSION_UNIQUE_SETTINGS=i.DIMENSION_UNIQUE_SETTINGS||0,this.IS_VIRTUAL=i.IS_VIRTUAL=="true"?!0:!1,this.IS_READWRITE=i.IS_READWRITE=="true"?!0:!1,this.hierarchies=[],this.CUBE_NAME=i.CUBE_NAME,this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.cube=r;if(i.hierarchies instanceof Array)for(var s in i.hierarchies){var o=i.hierarchies[s];this.addHierarchy(o)}this.id=e.Dimension.id++,e.Dimension.instances[this.id]=this},e.Dimension.id=1,e.Dimension.instances={},e.Dimension.prefix="olap.Dimension",e.Dimension.getInstance=function(t){return e.Dimension.instances[t]},e.Dimension.prototype={addHierarchy:function(n,r){return n instanceof Object&&(n instanceof e.Hierarchy==0&&(n=new e.Hierarchy(n,this)),this.hierarchies.push(n),typeof r=="function"&&r(n)),n},getUniqueName:function(){return this.DIMENSION_UNIQUE_NAME},getName:function(){return this.DIMENSION_NAME},getDimensionType:function(){return this.DIMENSION_TYPE},getHierarchies:function(){if(this.hierarchies.length!=0)return this.hierarchies;var t=function(t){return this.hierarchies};this.fetchHierarchies(t)},fetchHierarchies:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)}},e.Hierarchy=function(n,r){var i=n||{};if(i.HIERARCHY_UNIQUE_NAME==""||i.HIERARCHY_UNIQUE_NAME==undefined)throw new Error("Must supply a Unique Name");this.ALL_MEMBER=i.ALL_MEMBER||"",this.DEFAULT_MEMBER=i.DEFAULT_MEMBER||"",this.DESCRIPTION=i.DESCRIPTION||"",this.HIERARCHY_CAPTION=i.HIERARCHY_CAPTION||"",this.HIERARCHY_CARDINALITY=i.HIERARCHaY_CARDINALITY||"",this.HIERARCHY_NAME=i.HIERARCHY_NAME||"",this.HIERARCHY_ORDINAL=i.HIERARCHY_ORDINAL||0,this.HIERARCHY_UNIQUE_NAME=i.HIERARCHY_UNIQUE_NAME,this.PARENT_CHILD=i.PARENT_CHILD=="true"?!0:!1,this.STRUCTURE=i.STRUCTURE||0,this.DIMENSION_UNIQUE_NAME=i.DIMENSION_UNIQUE_NAME,this.CUBE_NAME=i.CUBE_NAME,this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.levels=[],this.dimension=r;if(i.levels instanceof Array)for(var s in i.levels){var o=i.levels[s];this.addLevel(o)}this.id=e.Hierarchy.id++,e.Hierarchy.instances[this.id]=this},e.Hierarchy.id=1,e.Hierarchy.instances={},e.Hierarchy.prefix="olap.Hierarchy",e.Hierarchy.getInstance=function(t){return e.Hierarchy.instances[t]},e.Hierarchy.validMethods=["Members","AllMembers"],e.Hierarchy.sugarMethods=["DefaultMember","AllMember"],e.Hierarchy.isBasicMethod=function(e){var t;for(t in this.validMethods)if(this.validMethods[t]==e)return!0},e.Hierarchy.isMethodValid=function(e){if(this.isBasicMethod(e)==1)return!0;var t;for(t in this.sugarMethods)if(this.sugarMethods[t]==e)return!0;return!1},e.Hierarchy.prototype={addLevel:function(n,r){return n instanceof Object&&(n instanceof e.Level==0&&(n=new e.Level(n,this)),this.levels.push(n),typeof r=="function"&&r(n)),n},toMDX:function(n,r){return e.Hierarchy.isBasicMethod(n)?this.getUniqueName()+"."+n:n=="DefaultMember"?this.getUniqueName():n=="AllMember"?this.getUniqueName()+"."+this.ALL_MEMBER:""},getHierarchy:function(){return this},getDimension:function(){return this.dimension},getName:function(){return this.HIERARCHY_NAME},getUniqueName:function(){return this.HIERARCHY_UNIQUE_NAME},getLevels:function(){if(this.levels.length!=0)return this.levels;var t=function(t){return this.levels};this.fetchLevels(t)},fetchLevels:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)}},e.Level=function(n,r){var i=n||{};this.LEVEL_UNIQUE_NAME=i.LEVEL_UNIQUE_NAME,this.LEVEL_NAME=i.LEVEL_NAME,this.LEVEL_CAPTION=i.LEVEL_CAPTION,this.DESCRIPTION=i.DESCRIPTION,this.CUSTOM_ROLLUP_SETTINGS=i.CUSTOM_ROLLUP_SETTINGS,this.LEVEL_CARDINALITY=i.LEVEL_CARDINALITY,this.LEVEL_NUMBER=i.LEVEL_NUMBER,this.LEVEL_TYPE=i.LEVEL_TYPE||0,this.HIERARCHY_UNIQUE_NAME=i.HIERARCHY_UNIQUE_NAME,this.DIMENSION_UNIQUE_NAME=i.DIMENSION_UNIQUE_NAME,this.CUBE_NAME=i.CUBE_NAME,this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.members=[];if(r instanceof e.Hierarchy)this.hierarchy=r;else if(r instanceof Object)this.hierarchy=new e.Hierarchy(r);else if(i.hierarchy instanceof Object)this.hierarchy=new e.Hierarchy(i.hierarchy);else if(!!i.hierarchy||!!r)throw new Error("hierarchy of level is not a valid object"+r.toString());this.id=e.Level.id++,e.Level.instances[this.id]=this},e.Level.id=1,e.Level.instances={},e.Level.prefix="olap.Level",e.Level.getInstance=function(t){return e.Level.instances[t]},e.Level.validMethods=["Members","AllMembers"],e.Level.sugarMethods=[],e.Level.isBasicMethod=function(t){var n;for(n in e.Level.validMethods)if(e.Level.validMethods[n]==t)return!0},e.Level.isMethodValid=function(t){if(e.Level.isBasicMethod(t)==1)return!0;var n;for(n in e.Level.sugarMethods)if(e.Level.sugarMethods[n]==t)return!0;return!1},e.Level.prototype={addMember:function(n,r){return n instanceof Object&&(n instanceof e.Member==0&&(n=new e.Member(n,this)),this.members.push(n),typeof r=="function"&&r(n)),n},getName:function(){return this.LEVEL_NAME},getLevelType:function(){return this.LEVEL_TYPE},getDepth:function(){return this.LEVEL_NUMBER},getCardinality:function(){return this.LEVEL_CARDINALITY},getUniqueName:function(){return this.LEVEL_UNIQUE_NAME},getHierarchy:function(){return this.hierarchy},toMDX:function(n,r){return e.Level.isBasicMethod(n)?this.getUniqueName()+"."+n:""},getMembers:function(){if(this.members.length!=0)return this.members;var t=function(t){return t};this.fetchMembers(t)},fetchMembers:function(){throw new Error("You must provide an implementation for: "+arguments.callee.name)}},e.Member=function(n,r){var i=n||{};this.MEMBER_UNIQUE_NAME=i.MEMBER_UNIQUE_NAME,this.MEMBER_NAME=i.MEMBER_NAME,this.MEMBER_TYPE=i.MEMBER_TYPE,this.CHILDREN_CARDINALITY=i.CHILDREN_CARDINALITY,this.MEMBER_ORDINAL=i.MEMBER_ORDINAL,this.MEMBER_CAPTION=i.MEMBER_CAPTION,this.LEVEL_NUMBER=i.LEVEL_NUMBER,this.LEVEL_UNIQUE_NAME=i.LEVEL_UNIQUE_NAME,this.HIERARCHY_UNIQUE_NAME=i.HIERARCHY_UNIQUE_NAME,this.DIMENSION_UNIQUE_NAME=i.DIMENSION_UNIQUE_NAME,this.CUBE_NAME=i.CUBE_NAME,this.SCHEMA_NAME=i.SCHEMA_NAME,this.CATALOG_NAME=i.CATALOG_NAME,this.level=r,this.id=e.Member.id++,e.Member.instances[this.id]=this},e.Member.id=1,e.Member.instances={},e.Member.prefix="olap.Member",e.Member.getInstance=function(t){return e.Level.instances[t]},e.Member.validMethods=["Children","Cousin","FirstChild","FirstSibling","LastChild","LastSibling","NextMember","Parent","PrevMember","Siblings"],e.Member.sugarMethods=["Self"],e.Member.isBasicMethod=function(t){var n;for(n in e.Member.validMethods)if(e.Member.validMethods[n]==t)return!0},e.Member.isMethodValid=function(t){if(e.Member.isBasicMethod(t)==1)return!0;var n;for(n in e.Member.sugarMethods)if(e.Member.sugarMethods[n]==t)return!0;return!1},e.Member.prototype={getName:function(){return this.MEMBER_NAME},getUniqueName:function(){return this.MEMBER_UNIQUE_NAME},toMDX:function(n,r){if(e.Member.isBasicMethod(n))return this.getUniqueName()+"."+n;switch(n){case"Self":return this.getUniqueName();default:return this.getUniqueName()}}},e.NamedSet=function(n,r){var i=n||{};this.CUBE_NAME=i.CUBE_NAME||"",this.SCHEMA_NAME=i.SCHEMA_NAME||"",this.CATALOG_NAME=i.CATALOG_NAME||"",this.SET_NAME=i.SET_NAME||"unknown",this.SCOPE=i.SCOPE||1,this.DESCRIPTION=i.DESCRIPTION||"",this.EXPRESSION=i.EXPRESSION||"",this.DIMENSIONS=i.DIMENSIONS||"",this.SET_CAPTION=i.SET_CAPTION||this.SET_NAME,this.SET_DISPLAY_FOLDER=i.SET_DISPLAY_FOLDER,this.cube=r,this.id=e.CellSet.id++,e.NamedSet.instances[this.id]=this},e.NamedSet.id=1,e.NamedSet.prefix="olap.NamedSet",e.NamedSet.instances={},e.NamedSet.getInstance=function(t){return e.NamedSet.instances[t]},e.NamedSet.prototype={getExpression:function(){return this.EXPRESSION},getCube:function(){return this.cube},getName:function(){return this.SET_NAME},getCaption:function(){return this.SET_CAPTION},getDescription:function(){return this.DESCRIPTION}},e.CellSet=function(n,r){var i=n||{axes:[],filterAxis:{},cells:[],CUBE_NAME:""},s,o,u;this.CUBE_NAME=i.CUBE_NAME,this.CATALOG_NAME=r,this.setSlicer(i.filterAxis),this.cells=[],this.axes=[];if(i.axes instanceof Array)for(var a=0,f=i.axes.length;a<f;a++)o=i.axes[a],o.ordinal=a,this.addAxis(o);if(i.cells instanceof Array)for(s in i.cells)u=i.cells[s],this.addCell(u);this.id=e.CellSet.id++,e.CellSet.instances[this.id]=this},e.CellSet.id=1,e.CellSet.prefix="olap.CellSet",e.CellSet.instances={},e.CellSet.getInstance=function(t){return e.CellSet.instances[t]},e.CellSet.prototype={setSlicer:function(n){n instanceof Object&&(n instanceof e.CellSetAxis==0&&(n=new e.CellSetAxis(n,this)),this.SLICER=n)},getAxes:function(){return this.axes},getFilterAxis:function(){return this.filterAxis},getCell:function(t){return this.cells[t]},getCubeName:function(){return this.CUBE_NAME},addAxis:function(n,r){return n instanceof Object&&(n instanceof e.CellSetAxis==0&&(n=new e.CellSetAxis(n,this)),this.axes.push(n),typeof r=="function"&&r(n)),n},addCell:function(n,r){return n instanceof Object&&(n instanceof e.Cell==0&&(n=new e.Cell(n,this)),this.cells.push(n),typeof r=="function"&&r(n)),n}},e.Cell=function(n,r){var i=n||{};this.value=i.value,this.formattedValue=i.formattedValue,this.ordinal=i.ordinal,this.cellset=r,this.id=e.Cell.id++,e.Cell.instances[this.id]=this},e.Cell.id=1,e.Cell.prefix="olap.Cell",e.Cell.instances={},e.Cell.getInstance=function(t){return e.Cell.instances[t]},e.Cell.prototype={getCellSet:function(){return this.cellset},getOrdinal:function(){return this.ordinal},getCoordinateList:function(){},getPropertyValue:function(t){},getValue:function(){return this.value},getFormattedValue:function(){return this.formattedValue}},e.Position=function(n,r){var i=n||{},s,o,u=e.Cube.getInstanceByName(r.getCellSet().CUBE_NAME,r.getCellSet().CATALOG_NAME);this.members={};for(idx in i)s=i[idx],o=filterProperty.apply(r.getHierarchies(),[{type:"equal",property:"HIERARCHY_UNIQUE_NAME",value:idx}]),s.HIERARCHY_UNIQUE_NAME=o.HIERARCHY_UNIQUE_NAME,this.members[idx]=new e.Member(s);this.id=e.Position.id++,e.Position.instances[this.id]=this},e.Position.id=1,e.Position.prefix="olap.Position",e.Position.instances={},e.Position.getInstance=function(t){return e.Position.instances[t]},e.Position.prototype={getOrdinal:function(){},getMembers:function(){}},e.CellSetAxis=function(n,r){var i=n||{ordinal:0},s,o,u;this.positions=[],this.hierarchies=[],this.cellset=r,this.ordinal=i.ordinal;if(i.hierarchies instanceof Array)for(s in i.hierarchies)u=i.hierarchies[s],this.hierarchies.push(new e.Hierarchy(u));if(i.positions instanceof Array)for(s in i.positions)o=i.positions[s],this.addPosition(o);this.id=e.CellSetAxis.id++,e.CellSetAxis.instances[this.id]=this},e.CellSetAxis.id=1,e.CellSetAxis.prefix="olap.CellSetAxis",e.CellSetAxis.instances={},e.CellSetAxis.getInstance=function(t){return e.CellSetAxis.instances[t]},e.CellSetAxis.prototype={getOrdinal:function(){},getCellSet:function(){return this.cellset},getAxisMetaData:function(){},getPositions:function(){return this.positions},getPositionCount:function(){return this.positions.length},getHierarchies:function(){return this.hierarchies},getProperties:function(){},addPosition:function(n,r){return n instanceof Object&&(n instanceof e.Position==0&&(n=new e.Position(n,this)),this.positions.push(n),typeof r=="function"&&r(n)),n},addHierarchy:function(n,r){var i=!1;if(n instanceof Object){for(var s=0,o=this.hierarchies.length;s<o;s++)this.hierarchies[s].HIERARCHY_UNIQUE_NAME==n.HIERARCHY_UNIQUE_NAME&&(i=!0);i==0&&(n instanceof e.Hierarchy==0&&n.HIERARCHY_UNIQUE_NAME&&n.HIERARCHY_UNIQUE_NAME!==""&&n.HIERARCHY_UNIQUE_NAME!==undefined&&n.HIERARCHY_UNIQUE_NAME!==" "?(n=new e.Hierarchy(n,this),this.hierarchies.push(n)):n instanceof e.Hierarchy==1&&this.hierarchies.push(n)),typeof r=="function"&&r(n)}return n}},e.Query=function(n,r){var i,s;n=n||{},r instanceof Object&&(r instanceof e.Cube==0?this.cube=new e.Cube(r):this.cube=r),this.name=n.name||"",this.axes=[];if(n.axes instanceof Array)for(i in n.axes)this.addAxis(n.axes[i]);this.text=n.text||"",this.results=n.results||null,this.id=e.Query.id++,e.Query.instances[this.id]=this},e.Query.id=1,e.Query.prefix="olap.query",e.Query.instances={},e.Query.getInstance=function(t){return e.Query.instances[t]},e.Query.prototype={addAxis:function(n){n instanceof Object&&n instanceof e.Axis==0&&(n=new e.Axis(n,this)),n instanceof e.Axis&&this.axes.push(n)},getAxes:function(){return this.axes.length==0&&this.fetchAxes(),this.axes},fetchAxes:function(){},getAxis:function(t){return this.axes.length==0&&this.fetchAxes(),this.axes[t]},getCube:function(){return this.cube},getName:function(){return this.name},createAxis:function(n){var r=new e.Axis(n,this);return this.axes.push(r),r},reset:function(){for(var e in this.axes)this.axes[e].reset()},getMDX:function(){var t="",n=this.getAxes(),r,i;for(var s=0,o=n.length;s<o;s++)i=this.getAxis(s).getMdx(),t+=" "+i;return t.length&&(t="SELECT"+t+"\nFROM   ["+this.getCube().getName()+"]"),console.debug(t),t},execute:function(n){var r=this.results||new e.CellSet({});if(typeof n!="function")return r;n.call(this,r),delete r}},e.Axis=function(t,n){t=t||{},this.query=n||{},this.name=t.name||"Column",this.location=t.location||0,this.collections=[]},e.Axis.prototype={getLocation:function(){return this.location},getName:function(){return this.name},findCollection:function(e){var t;for(var n=0,r=this.collections.length;n<r;n++){t=this.collections[n];if(t.getHierarchy()==e.getBase().getHierarchy())return t}return null},collectionCount:function(){},addCollection:function(e){this.collections.push(e)},addExpression:function(n){!n instanceof e.Expression&&(n=new e.Expression(n));var r=this.findCollection(n);r instanceof e.ExpressionCollection?r.addExpression(n):(r=new e.ExpressionCollection,r.setHierarchy(n.getBase().getHierarchy()),r.addExpression(n),this.addCollection(r))},reset:function(){this.collections=[]},getMdx:function(){var e=this.collections,t,n=e.length,r,i,s,o,u,a,f,l="",c;for(t=0;t<n;t++){o=null,u=null,r=e[t],s=r.getHierarchy().getName(),exprs=r.expressions;for(var h=0,p=exprs.length,f="";h<p;h++)f.length&&(f+=", "),f+=exprs[h].toMDX();c="{"+f+"}",s!=="Measures"&&n>1&&(c="Hierarchize("+c+")"),l=l?"CrossJoin("+l+", "+c+")":c}return l.length&&(l=l+" ON Axis("+this.getLocation()+")"),l}},e.Expression=function(t){var n=t||{base:{},method:null,param:[]};this.base={},this.method={},this.param=[],this.setBase(n.base),this.setMethod(n.method),this.setParameters(n.param),delete n},e.Expression.prototype={setBase:function(e){if(!e)throw new Error("Member Expressions must have a base metadata object");this.base=e},getBase:function(){return this.base},setMethod:function(e){if(!e)throw new Error("Member Expressions must have a valid method");if(!this.validateMethod(e))throw new Error("Method: "+e+" is not a valid method");this.method=e},getMethod:function(){return this.method},setParameters:function(e){e instanceof Array&&(this.param=e)},getParameters:function(){return this.param},validateMethod:function(n){return this.base instanceof e.Member?e.Member.isMethodValid(n):this.base instanceof e.Level?e.Level.isMethodValid(n):this.base instanceof e.Hierarchy?e.Hierarchy.isMethodValid(n):this.base instanceof e.Measure?e.Measure.isMethodValid(n):!1},toMDX:function(){return this.base.toMDX(this.getMethod(),this.getParameters())}},e.ExpressionCollection=function(){this.expressions=[]},e.ExpressionCollection.prototype={setHierarchy:function(n){if(n&&this.hierarchy)throw new Error("Cannot set Hierarchy after being set");if(!(n instanceof e.Hierarchy))throw new Error("Object: "+n+" is not an olap.Hierarchy");this.hierarchy=n},getHierarchy:function(){return this.hierarchy||{}},addExpression:function(e){var t=e.getBase().getHierarchy();if(t.HIERARCHY_UNIQUE_NAME!=this.getHierarchy().HIERARCHY_UNIQUE_NAME)throw new Error("Cannot add two expressions from differing hierarchies in same ExpressionCollection:"+this.getHierarchy().HIERARCHY_UNIQUE_NAME+":"+t.HIERARCHY_UNIQUE_NAME);this.expressions.push(e)},reset:function(){delete this.hierarchy,this.expressions=[]},getFunction:function(){return this.expFunction}}})(this),filterProperty=function(e,t){var n=[],r;if(this instanceof Array){for(var i=0,s=this.length;i<s;i++)r=filterProperty.apply(this[i],[e,t]),r&&n.push(r);return n.length==1?n[0]:n}arguments.length==1&&typeof e=="function"&&(t=e,e=null),typeof t!="function"&&(t=function(){});if(e==null)return t(this),this;try{switch(e.type){case"gt":return this[e.property]>e.value?(t(this),this):null;case"lt":return this[e.property]<e.value?(t(this),this):null;case"equal":default:return this[e.property]==e.value?(t(this),this):null}}catch(o){return null}};