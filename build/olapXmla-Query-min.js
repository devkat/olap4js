olapXmla.Query=function(t,n,r,i){olap.Query.call(this,t,n),this.connection=r||{}},inheritPrototype(olapXmla.Query,olap.Query),olapXmla.Query.prototype.execute=function(t){var n=this,r={},i,s,o,u,a,f;i=this.getMDX(),o=this.getCube().getCatalog().getDatabase().getOlapConnection().executeOlapQuery({mdx:i,catalog:this.getCube().getCatalog().getName(),success:function(e){typeof t=="function"&&t.call(this,e)}})};