import{o as g,c as m,J as B,T as x,V as c,W as T,Q as k,K as b,Y as O,a as d,L as p,U as I,R as C,X as M,bi as D,bg as L}from"../@vue/@vue.5ea14220.js";const q=(o,t)=>{const e=o.__vccOpts||o;for(const[r,s]of t)e[r]=s;return e},F="vue-img-cutter",P="3.0.4",N="A image crop plug-in for Vue,you can use it to rotate、zoom images and cut any size",S="acccccccb <tabzhang@foxmail.com>",U={serve:"vue-cli-service serve",build:"vue-cli-service build",lint:"vue-cli-service lint"},R={"core-js":"^3.20.3",vue:"^3.2.29","vue-i18n":"^9.1.10"},z={"@vue/cli-plugin-babel":"~4.5.15","@vue/cli-plugin-eslint":"~4.5.15","@vue/cli-service":"~4.5.15","@vue/compiler-sfc":"^3.2.29","babel-eslint":"^10.1.0",eslint:"^6.8.0","eslint-plugin-vue":"^7.20.0"},A="./src/index.js",Y={type:"git",url:"git+https://github.com/acccccccb/vue-img-cutter.git"},X=["image","crop","cutter","vue","裁剪"],j="Apache2.0",V={url:"https://github.com/acccccccb/vue-img-cutter/issues"},E="https://ihtmlcss.com/demo/dist/#/croptool",G={root:!0,env:{node:!0},extends:["plugin:vue/vue3-essential","eslint:recommended"],parserOptions:{parser:"babel-eslint"},rules:{}},K=["> 1%","last 2 versions","not dead"],J={name:F,version:P,description:N,author:S,private:!1,scripts:U,dependencies:R,devDependencies:z,main:A,repository:Y,keywords:X,license:j,bugs:V,homepage:E,eslintConfig:G,browserslist:K};const Q={name:"ImgCutter",props:{crossOrigin:{type:Boolean,default:!1,required:!1},crossOriginHeader:{type:String,default:"*",required:!1},label:{type:String,default:"选择图片",required:!1},isModal:{type:Boolean,default:!0,required:!1},lockScroll:{type:Boolean,default:!0,required:!1},showChooseBtn:{type:Boolean,default:!0,required:!1},boxWidth:{type:Number,default:800,required:!1},boxHeight:{type:Number,default:400,required:!1},cutWidth:{type:Number,default:200,required:!1},cutHeight:{type:Number,default:200,required:!1},rate:{type:String,default:null,required:!1},tool:{type:Boolean,default:!0,required:!1},toolBgc:{type:String,default:"#fff",required:!1},imgMove:{type:Boolean,default:!0,required:!1},sizeChange:{type:Boolean,default:!0,required:!1},originalGraph:{type:Boolean,default:!1,required:!1},moveAble:{type:Boolean,default:!0,required:!1},previewMode:{type:Boolean,default:!0,required:!1},CuttingOriginal:{type:Boolean,default:!1,required:!1},WatermarkText:{type:String,default:"",required:!1},WatermarkTextFont:{type:String,default:"12px Sans-serif",required:!1},WatermarkTextColor:{type:String,default:"#fff",required:!1},WatermarkTextX:{type:Number,default:.95,required:!1},WatermarkTextY:{type:Number,default:.95,required:!1},smallToUpload:{type:Boolean,default:!1,required:!1},saveCutPosition:{type:Boolean,default:!1,required:!1},scaleAble:{type:Boolean,default:!0,required:!1},index:{default:null,required:!1},fileType:{default:"png",required:!1,type:String},toolBoxOverflow:{type:Boolean,default:!0,required:!1},DoNotDisplayCopyright:{type:Boolean,default:!1,required:!1},quality:{type:Number,default:1,required:!1},accept:{type:String,default:"image/gif, image/jpeg ,image/png",required:!1}},model:["label","boxWidth","boxHeight","rate","tool","DoNotDisplayCopyright"],data(){let o,t;return o=this.boxWidth/2,t=this.boxHeight/2,{version:"",visible:!1,fileName:"",cutImageObj:null,onPrintImgTimmer:null,toolBoxPosition:{x:0,y:0},drawImg:{img:null,sx:0,sy:0,swidth:0,sheight:0,x:0,y:0,width:0,height:0},toolBox:{disable:!0,width:o,height:t,x:0,y:0,boxMove:{start:{x:0,y:0},moveTo:{x:0,y:0}}},dropImg:{active:!1,pageX:0,pageY:0,params:{}},rotateImg:{angle:0},rotateControl:{active:!1,start:{x:0,y:0},position:100},scaleImg:{rate:0,params:{}},controlBox:{disable:!0,btnName:"",start:{x:0,y:0,width:0,height:0}},selectBox:!1,selectBoxColor:"rgba(0,0,0,0.6)",isFlipHorizontal:!1,isFlipVertically:!1}},mounted(){this.version=J.version,this.isModal===!1&&(this.visible=!0,this.$nextTick(()=>{this.$refs.toolBox&&(this.$refs.toolBox.onmousewheel=this.scaleImgWheel,this.$refs.toolBox.addEventListener("DOMMouseScroll",this.scaleImgWheel))}))},methods:{handleOpen(o){let t=e=>{if(this.$refs.toolBox&&(this.$refs.toolBox.onmousewheel=this.scaleImgWheel,this.$refs.toolBox.addEventListener("DOMMouseScroll",this.scaleImgWheel)),this.isModal===!0){this.lockScroll===!0&&(document.body.style.overflowY="hidden");let r=this.$refs.dialogMainModalRef.offsetHeight+200,s=window.innerHeight,i=this.$refs.mask;r>s?i.style.overflowY="scroll":i.style.overflowY="hidden"}e&&typeof e=="function"&&e()};if(o&&typeof o=="object"&&o.src)if(o.name){let e=new Image;this.crossOrigin===!0&&(e.crossOrigin=this.crossOriginHeader),e.name=o.name,e.style.position="fixed",e.style.top="-5000px",e.style.opacity=0,e.onerror=r=>{console.error("图片加载失败"),this.$emit("error",{index:this.index,event:r,msg:"图片加载失败"}),this.clearCutImageObj()},e.onload=()=>{if(e.complete===!0)this.visible=!0,this.$nextTick(()=>{t(()=>{this.importImgToCanv(e)})});else throw new Error("图片加载失败")},e.src=o.src,this.cutImageObj=e,document.body.appendChild(e),this.$emit("onChooseImg",o,this.index)}else throw new Error("传入参数必须包含：src,name");else this.visible=!0,this.$nextTick(()=>{t()})},handleClose(){this.clearAll(),this.isModal===!0&&(this.lockScroll===!0&&(document.body.style.overflowY="scroll"),this.$nextTick(()=>{this.visible=!1}))},chooseImg(){this.$refs.inputFile.click()},importImgToCanv(o){let t=o.height,e=o.width,r=this.boxWidth,s=this.boxHeight,i,l={...this.drawImg};this.fileName=o.name,l.img=o,this.scaleImg.rate=e/t,t<s&&e<r?(i=1,l.x=(r-e)/2,l.y=(s-t)/2):e/t<=r/s?(i=s/t,l.x=(r-e*i)/2):(i=r/e,l.y=(s-t*i)/2),l.swidth=e,l.sheight=t,l.width=e*i,l.height=t*i,l.x=(r-l.width)/2,l.y=(s-l.height)/2,this.drawImg=l,this.printImg(),this.putToolBox()},putImgToCanv(o){let t;if(o.target.files)t=o.target.files[0]||null;else return console.error("IE9及以下需要自己传入image对象"),!1;if(t){this.fileName=t.name;let e=new FileReader;e.readAsDataURL(t),e.onload=r=>{let s=r.target.result,i=document.createElement("img");i.src=s;let l=setInterval(()=>{if(e.readyState===2){if(clearInterval(l),!this.sizeChange&&this.smallToUpload&&i.width<=this.cutWidth&&i.height<=this.cutHeight){this.handleClose(),t.name=this.changeFileName(t.name,this.fileType),this.$emit("cutDown",{filename:this.changeFileName(t.name,this.fileType),file:t,index:this.index});return}let h=i.height,n=i.width,a=this.boxWidth,u=this.boxHeight,w,f={...this.drawImg};f.img=i,this.scaleImg.rate=n/h,h<u&&n<a?(w=1,f.x=(a-n)/2,f.y=(u-h)/2):n/h<=a/u?(w=u/h,f.x=(a-n*w)/2):(w=a/n,f.y=(u-h*w)/2),f.swidth=n,f.sheight=h,f.width=n*w,f.height=h*w,f.x=(a-f.width)/2,f.y=(u-f.height)/2,this.drawImg=f,this.printImg(),this.putToolBox()}},200)},this.$emit("onChooseImg",t,this.index)}},putToolBox(){(this.toolBox.width===this.boxWidth/2||this.toolBox.height===this.boxHeight/2||this.saveCutPosition===!1)&&(this.toolBox.width=this.cutWidth>this.boxWidth?this.boxWidth:this.cutWidth,this.toolBox.height=this.cutHeight>this.boxHeight?this.boxHeight:this.cutHeight),(this.toolBox.x===0&&this.toolBox.y===0||this.saveCutPosition===!1)&&(this.toolBox.x=this.boxWidth/2-this.toolBox.width/2,this.toolBox.y=this.boxHeight/2-this.toolBox.height/2),this.checkToolBoxOverflow().then(()=>{this.printImg()}),this.drawControlBox(this.toolBox.width,this.toolBox.height,this.toolBox.x,this.toolBox.y)},checkToolBoxOverflow(){return new Promise(o=>{if(!this.toolBoxOverflow){if(this.drawImg.width<this.toolBox.width||this.drawImg.height<this.toolBox.height){const t=this.drawImg.width/this.drawImg.height;this.drawImg.width<this.toolBox.width&&(this.drawImg.width=this.toolBox.width,this.drawImg.height=this.drawImg.width/t),this.drawImg.height<this.toolBox.height&&(this.drawImg.height=this.toolBox.height,this.drawImg.width=this.drawImg.height*t),this.drawImg.x=(this.boxWidth-this.drawImg.width)/2,this.drawImg.y=(this.boxHeight-this.drawImg.height)/2}console.log("this.drawImg.y > this.toolBox.y",this.drawImg.y+this.drawImg.height,this.toolBox.y+this.toolBox.height),this.drawImg.x>this.toolBox.x&&(this.drawImg.x=this.toolBox.x),this.drawImg.x+this.drawImg.width<this.toolBox.x+this.toolBox.width&&(this.drawImg.x=this.toolBox.x+this.toolBox.width-this.drawImg.width),this.drawImg.y>this.toolBox.y&&(this.drawImg.y=this.toolBox.y),this.drawImg.y+this.drawImg.height<this.toolBox.y+this.toolBox.height&&(this.drawImg.y=this.toolBox.y+this.toolBox.height-this.drawImg.height)}o()})},isSupportFileApi(){return!!(window.File&&window.FileList&&window.FileReader&&window.Blob&&navigator.userAgent.indexOf("Edge")===-1&&navigator.userAgent.indexOf("MSIE")===-1&&navigator.userAgent.indexOf("Trident")===-1)},dataURLtoFile(o,t){let e=o.split(","),r=e[0].match(/:(.*?);/)[1],s=atob(e[1]),i=s.length,l=new Uint8Array(i);for(;i--;)l[i]=s.charCodeAt(i);return this.isSupportFileApi()?new File([l],t,{type:r}):"不支持File对象"},clearAll(){let o=this,t=o.$refs.canvas;t.getContext("2d").clearRect(0,0,t.width,t.height);let r=o.$refs.canvasSelectBox;r.getContext("2d").clearRect(0,0,r.width,r.height);let i=o.drawImg.sx,l=o.drawImg.sy;this.drawImg={img:null,sx:i,sy:l,swidth:0,sheight:0,x:0,y:0,width:0,height:0},this.isFlipHorizontal=!1,this.isFlipVertically=!1,this.$refs.inputFile.value="",this.rotateImg.angle=0,this.drawImg.img=null,this.turnReset(),this.clearCutImageObj(),this.$emit("onClearAll",this.index)},clearCutImageObj(){this.cutImageObj!==null&&this.cutImageObj!==void 0&&(typeof this.cutImageObj.remove=="function"?this.cutImageObj.remove():this.cutImageObj.removeNode()),this.cutImageObj=null},drawControlBox(o,t,e,r){this.toolBoxOverflow||(o<1&&(o=1),t<1&&(t=1),o>this.drawImg.width&&(o=this.drawImg.width),t>this.drawImg.height&&(t=this.drawImg.height),e<this.drawImg.x&&(e=this.drawImg.x),r<this.drawImg.y&&(r=this.drawImg.y),e>this.drawImg.x+this.drawImg.width-o&&(e=this.drawImg.x+this.drawImg.width-o),r>this.drawImg.y+this.drawImg.height-t&&(r=this.drawImg.y+this.drawImg.height-t)),o>this.boxWidth&&(o=this.boxWidth),t>this.boxHeight&&(t=this.boxHeight),e<0&&(e=0),r<0&&(r=0);let s=this.$refs.toolBoxControl,i=this.$refs.canvasSelectBox,l=i.getContext("2d");l.fillStyle=this.selectBoxColor,l.clearRect(0,0,i.width,i.height),l.fillRect(0,0,i.width,i.height);let h,n;if(this.rate&&this.rate!==""){let a=this.rate.split(":")[0]/this.rate.split(":")[1];a>=1?(h=o,n=o/a,n+r>this.drawImg.y+this.drawImg.height&&(n=this.drawImg.y+this.drawImg.height-r,h=n*a)):(h=t*a,n=t)}else h=o,n=t;this.toolBox.width=Math.abs(h),this.toolBox.height=Math.abs(n),s.style.width=Math.abs(h)+"px",s.style.height=Math.abs(n)+"px",this.toolBox.boxMove.moveTo.x=e,this.toolBox.boxMove.moveTo.y=r,h<0&&(e=e+h),n<0&&(r=r+n),e+this.toolBox.width>this.boxWidth&&(e=this.boxWidth-this.toolBox.width),e<0&&(e=0),r+this.toolBox.height>this.boxHeight&&(r=this.boxHeight-this.toolBox.height),r<0&&(r=0),this.toolBoxPosition.x=e,this.toolBoxPosition.y=r,s.style.left=e+"px",s.style.top=r+"px",l.clearRect(e,r,Math.abs(h),Math.abs(n)),this.onPrintImgTimmer&&clearTimeout(this.onPrintImgTimmer),this.onPrintImgTimmer=setTimeout(()=>{this.cropPicture(!0)},100)},resetToolBox(){this.toolBox.width<0&&(this.toolBox.boxMove.moveTo.x=this.toolBox.x-this.toolBox.width),this.toolBox.height<0&&(this.toolBox.boxMove.moveTo.y=this.toolBox.y-this.toolBox.height),this.toolBox.width=Math.abs(this.toolBox.width),this.toolBox.height=Math.abs(this.toolBox.height)},toolBoxMouseDown(o){let t=this.$refs.toolBoxControl;this.toolBox.x=parseInt(t.style.left.split("px")[0]),this.toolBox.y=parseInt(t.style.top.split("px")[0]),this.toolBox.disable=!1,this.dropImg.active=!1,this.toolBox.boxMove.start={x:o.pageX,y:o.pageY}},toolBoxMouseMove(o){if(this.dropImg.active&&this.dropImgMove(o),this.toolBox.disable===!1&&this.moveAble===!0){let t=o.pageX-this.toolBox.boxMove.start.x,e=o.pageY-this.toolBox.boxMove.start.y,r=this.toolBox.x+t,s=this.toolBox.y+e;this.drawControlBox(this.toolBox.width,this.toolBox.height,r,s)}},toolBoxMouseLeave(){this.toolBox.disable=!0,this.onPrintImgTimmer&&clearTimeout(this.onPrintImgTimmer),this.onPrintImgTimmer=setTimeout(()=>{this.cropPicture(!0)},100),this.resetToolBox()},toolBoxMouseUp(){this.toolBox.x=parseInt(this.toolBoxPosition.x),this.toolBox.y=parseInt(this.toolBoxPosition.y),this.toolBox.disable=!0,this.dropImg.active=!1,this.resetToolBox()},printImg(){if(this.drawImg.img){let o=this.$refs.canvas,t=o.getContext("2d");t.font="18px bold 黑体",t.fillStyle="#ff0",t.textAlign="center",t.textBaseline="middle",t.save(),t.clearRect(0,0,o.width,o.height),t.translate(this.drawImg.x+this.drawImg.width/2,this.drawImg.y+this.drawImg.height/2),t.rotate(this.rotateImg.angle*Math.PI/180),t.translate(-(this.drawImg.x+this.drawImg.width/2),-(this.drawImg.y+this.drawImg.height/2)),t.translate(this.drawImg.x,this.drawImg.y),t.scale(this.isFlipHorizontal?-1:1,this.isFlipVertically?-1:1),t.drawImage(this.drawImg.img,this.drawImg.sx,this.drawImg.sy,this.drawImg.swidth,this.drawImg.sheight,this.isFlipHorizontal?-this.drawImg.width:0,this.isFlipVertically?-this.drawImg.height:0,this.drawImg.width,this.drawImg.height),t.translate(-this.drawImg.x,this.drawImg.y),t.restore(),this.onPrintImgTimmer&&clearTimeout(this.onPrintImgTimmer),this.onPrintImgTimmer=setTimeout(()=>{this.cropPicture(!0)},100)}},dropImgOn(o){this.imgMove===!0&&(this.dropImg.active=!0,this.dropImg.params={...this.drawImg},this.dropImg.pageX=o.pageX,this.dropImg.pageY=o.pageY)},dropImgOff(){this.dropImg.active=!1,this.onPrintImgTimmer&&clearTimeout(this.onPrintImgTimmer),this.onPrintImgTimmer=setTimeout(()=>{this.cropPicture(!0)},100)},dropImgMove(o){if(this.dropImg.active&&this.drawImg.img){let t={...this.drawImg};t.x=this.dropImg.params.x-(this.dropImg.pageX-o.pageX),t.y=this.dropImg.params.y-(this.dropImg.pageY-o.pageY),this.toolBoxOverflow||(t.x>this.toolBox.x&&(t.x=this.toolBox.x),t.x<this.toolBox.x+this.toolBox.width-t.width&&(t.x=this.toolBox.x+this.toolBox.width-t.width),t.y>this.toolBox.y&&(t.y=this.toolBox.y),t.y<this.toolBox.y+this.toolBox.height-t.height&&(t.y=this.toolBox.y+this.toolBox.height-t.height)),this.drawImg=t,this.printImg(),o.stopPropagation()}},scaleReset(){this.drawImg.width=this.drawImg.swidth,this.drawImg.height=this.drawImg.sheight,this.printImg()},scaleImgWheel(o){if(this.drawImg.img&&this.scaleAble===!0){let t,e=o||window.event;e.wheelDelta?t=-(e.wheelDelta/40):e.detail&&(t=e.detail);let r=50;this.drawImg.x=this.drawImg.width-t*9>r?this.drawImg.x+t*3:this.drawImg.x,this.drawImg.y=this.drawImg.width-t*9>r?this.drawImg.y+t*3:this.drawImg.y,this.drawImg.width=this.drawImg.width-t*9>r?this.drawImg.width-t*9:r,this.drawImg.height=this.drawImg.width/this.scaleImg.rate,this.checkToolBoxOverflow().then(()=>{this.printImg(),this.onPrintImgTimmer&&clearTimeout(this.onPrintImgTimmer),this.onPrintImgTimmer=setTimeout(()=>{this.cropPicture(!0)},100)})}return o.preventDefault(),o.returnValue=!1,!1},flipHorizontal(){this.drawImg.img&&(this.isFlipHorizontal==!1?this.isFlipHorizontal=!0:this.isFlipHorizontal=!1,this.printImg())},flipVertically(){this.drawImg.img&&(this.isFlipVertically==!1?this.isFlipVertically=!0:this.isFlipVertically=!1,this.printImg())},turnImg(o){let e=this.rotateImg.angle+o;e>=-180&&e<=180&&(this.rotateImg.angle=e,this.rotateControl.position=e/180*100+100,this.printImg("rotate"))},turnReset(){this.rotateImg.angle=0,this.rotateControl.position=100,this.printImg("rotate")},controlBtnMouseDown(o,t){this.controlBox.disable=!1,this.controlBox.btnName=t,this.controlBox.start.x=o.clientX,this.controlBox.start.y=o.clientY,this.controlBox.start.width=this.toolBox.width,this.controlBox.start.height=this.toolBox.height,o.stopPropagation()},controlBtnMouseUp(o){this.controlBox.disable=!0,this.dropImgOff(),this.resetToolBox(),this.toolBoxMouseUp(),o.stopPropagation()},controlBtnMouseMove(o){if(this.controlBox.disable===!1){let t=o.clientX-this.controlBox.start.x,e=o.clientY-this.controlBox.start.y,r,s;if(this.controlBox.btnName=="leftUp"){if(!this.rate)r=this.toolBox.x+t,s=this.toolBox.y+e;else{let i=this.rate.split(":")[0]/this.rate.split(":")[1];i>=1?(r=this.toolBox.x+t,s=this.toolBox.y+t/i):(r=this.toolBox.x+e*i,s=this.toolBox.y+e)}this.toolBox.width=this.controlBox.start.width-t,this.toolBox.height=this.controlBox.start.height-e}if(this.controlBox.btnName=="rightUp"){if(!this.rate)r=this.toolBox.x,s=this.toolBox.y+e;else{let i=this.rate.split(":")[0]/this.rate.split(":")[1];i>=1?(r=this.toolBox.x,s=this.toolBox.y-t/i):(r=this.toolBox.x,s=this.toolBox.y+e)}this.toolBox.width=this.controlBox.start.width+t,this.toolBox.height=this.controlBox.start.height-e}if(this.controlBox.btnName=="rightDown"&&(r=this.toolBox.x,s=this.toolBox.y,this.toolBox.width=this.controlBox.start.width+t,this.toolBox.height=this.controlBox.start.height+e),this.controlBox.btnName=="leftDown"){if(!this.rate)r=this.toolBox.x+t,s=this.toolBox.y;else{let i=this.rate.split(":")[0]/this.rate.split(":")[1];i>=1?(r=this.toolBox.x+t,s=this.toolBox.y):(r=this.toolBox.x+-e*i,s=this.toolBox.y)}this.toolBox.width=this.controlBox.start.width-t,this.toolBox.height=this.controlBox.start.height+e}this.controlBox.btnName=="topCenter"&&(r=this.toolBox.x,s=this.toolBox.y+e,this.toolBox.width=this.controlBox.start.width,this.toolBox.height=this.controlBox.start.height-e),this.controlBox.btnName=="downCenter"&&(r=this.toolBox.x,s=this.toolBox.y,this.toolBox.width=this.controlBox.start.width,this.toolBox.height=this.controlBox.start.height+e),this.controlBox.btnName=="leftCenter"&&(r=this.toolBox.x+t,s=this.toolBox.y,this.toolBox.width=this.controlBox.start.width-t,this.toolBox.height=this.controlBox.start.height),this.controlBox.btnName=="rightCenter"&&(r=this.toolBox.x,s=this.toolBox.y,this.toolBox.width=this.controlBox.start.width+t,this.toolBox.height=this.controlBox.start.height),this.drawControlBox(this.toolBox.width,this.toolBox.height,r,s)}o.stopPropagation()},changeFileName(o,t){let e=o.lastIndexOf(".");return o.substr(0,e+1)+(t==="jpeg"?"jpg":t)},cropPicture(o){let t=this;if(this.drawImg.img){let e=this.$refs.canvas;if(this.WatermarkText&&!o){let s=e.getContext("2d");s.font=this.WatermarkTextFont,s.fillStyle=this.WatermarkTextColor,s.textAlign="right",s.textBaseline="bottom",s.fillText(this.WatermarkText,this.toolBox.x+this.toolBox.width*this.WatermarkTextX,this.toolBox.y+this.toolBox.height*this.WatermarkTextY)}let r=new Image;this.crossOrigin===!0&&(r.crossOrigin=this.crossOriginHeader),r.src=e.toDataURL(`image/${this.fileType}`,t.quality),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:(s,i,l)=>{window.atob?setTimeout(()=>{let h=atob(e.toDataURL(i,l).split(",")[1]),n=h.length,a=new Uint8Array(n),u;for(let w=0;w<n;w++)a[w]=h.charCodeAt(w);try{u=new Blob([a],{type:`image/${t.fileType}`})}catch(w){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,w.name=="TypeError"&&window.BlobBuilder){const f=window.BlobBuilder;let v=new f;v.append(a.buffer),u=v.getBlob(`image/${t.fileType}`)}w.name=="InvalidStateError"&&(u=new Blob([a.buffer],{type:`image/${t.fileType}`}))}s(u)},200):s(!1,{type:`image/${t.fileType}`})}}),e.toBlob(s=>{if(s){let i=new FileReader;i.readAsDataURL(s),i.onload=()=>{let l=setInterval(()=>{if(i.readyState==2){clearInterval(l);let h=document.createElement("canvas"),n=h.getContext("2d");if(t.originalGraph==!0){let a=t.drawImg.width/t.drawImg.swidth,u=t.toolBox.width/a,w=t.toolBox.height/a;h.width=u,h.height=w;let f=(t.toolBox.x-t.drawImg.x)/a,v=(t.toolBox.y-t.drawImg.y)/a,H=t.drawImg.swidth,W=t.drawImg.sheight;n.translate(-f,-v),n.drawImage(t.drawImg.img,0,0,H,W)}else{h.width=t.toolBox.width,h.height=t.toolBox.height;let a=t.toolBox;if(t.rate){let u=t.rate.split(":")[0]/t.rate.split(":")[1],w=t.rate.split(":")[0],f=t.rate.split(":")[1];w>=f?n.drawImage(r,a.x,a.y,a.width,a.width*u,0,0,a.width,a.width*u):n.drawImage(r,a.x,a.y,a.width,a.width/u,0,0,a.width,a.width/u)}else n.drawImage(r,a.x,a.y,a.width,a.height,0,0,a.width,a.height)}h.toBlob(a=>{let u=t.changeFileName(t.fileName,t.fileType);o?t.previewMode&&t.$emit("onPrintImg",{index:t.index,fileName:u,blob:a,file:t.dataURLtoFile(h.toDataURL(`image/${t.fileType}`,t.quality),u),dataURL:h.toDataURL(`image/${t.fileType}`,t.quality)}):(t.handleClose(),t.$emit("cutDown",{index:t.index,fileName:u,blob:a,file:t.dataURLtoFile(h.toDataURL(`image/${t.fileType}`,t.quality),u),dataURL:h.toDataURL(`image/${t.fileType}`,t.quality)}))},`image/${t.fileType}`,t.quality)}},200)}}else{let i=document.createElement("canvas");i.width=t.toolBox.width,i.height=t.toolBox.height;let l=i.getContext("2d"),h=t.toolBox;if(t.rate){let a=t.rate.split(":")[0]/t.rate.split(":")[1];l.drawImage(r,h.x,h.y,h.width,h.width*a,0,0,h.width,h.width*a)}else l.drawImage(r,h.x,h.y,h.width,h.height,0,0,h.width,h.height);let n=t.changeFileName(t.fileName,t.fileType);o?t.$emit("onPrintImg",{fileName:n,dataURL:i.toDataURL(`image/${t.fileType}`,t.quality)}):(t.handleClose(),t.$emit("cutDown",{fileName:n,dataURL:i.toDataURL(`image/${t.fileType}`,t.quality)}))}}),`${t.fileType}`,t.quality}else o||(console.warn("No picture selected"),t.$emit("error",{err:1,msg:"No picture selected"}))},scrollBarControlMove(o){if(this.rotateControl.active){let t=o.pageX-this.rotateControl.start.x,e=this.rotateControl.start.position+t;e<=0&&(e=0),e>=200&&(e=200),this.rotateControl.position=e,this.rotateImg.angle=(e-100)/100*180,this.printImg()}},scrollBarControlOn(o){this.rotateControl.active=!0,this.rotateControl.start.x=o.pageX,this.rotateControl.start.y=o.pageY,this.rotateControl.start.position=this.rotateControl.position},scrollBarControlOff(){this.rotateControl.active=!1}},computed:{showToolBoxWidth(){let o;return this.originalGraph?o=this.toolBox.width/(this.drawImg.width/this.drawImg.swidth):o=this.toolBox.width,Number(o).toFixed(0)},showToolBoxHeight(){let o;return this.originalGraph?o=this.toolBox.height/(this.drawImg.width/this.drawImg.swidth):o=this.toolBox.height,Number(o).toFixed(0)},showToolBoxX(){let o;return o=this.toolBoxPosition.x,Number(o).toFixed(0)},showToolBoxY(){let o;return o=this.toolBoxPosition.y,Number(o).toFixed(0)}}},y=o=>(D("data-v-283347e7"),o=o(),L(),o),Z={class:"toolMain"},_={key:0,class:"tool-title"},$={class:"tips"},tt={key:0,class:"dockBtn"},et={key:4,class:"dockBtnScrollBar"},ot={class:"toolBoxControlBox"},it={class:"controlBox"},lt=y(()=>d("div",{class:"controlBoxInnerLine controlBoxInnerLineTop"},null,-1)),st=y(()=>d("div",{class:"controlBoxInnerLine controlBoxInnerLineBottom"},null,-1)),rt=y(()=>d("div",{class:"controlBoxInnerLine controlBoxInnerLineLeft"},null,-1)),ht=y(()=>d("div",{class:"controlBoxInnerLine controlBoxInnerLineRight"},null,-1)),at={class:"selectArea"},nt=y(()=>d("div",{class:"toolBoxControlLine toolBoxControlLineItem-1"},null,-1)),dt=y(()=>d("div",{class:"toolBoxControlLine toolBoxControlLineItem-2"},null,-1)),gt=y(()=>d("div",{class:"toolBoxControlLine toolBoxControlLineItem-3"},null,-1)),mt=y(()=>d("div",{class:"toolBoxControlLine toolBoxControlLineItem-4"},null,-1)),xt={class:"copyright"},ut={key:0,target:"_blank",href:"https://github.com/acccccccb/vue-img-cutter",rel:"nofollow"},ft=["width","height"],wt=["width","height"],Bt={class:"i-dialog-footer",style:{height:"40px"}},ct=["accept"],It={key:0,class:"btn btn-primary btn-primary-plain"},yt={class:"btn-group fr"},pt=y(()=>d("button",{type:"button",class:"btn btn-default"},"取消",-1)),vt=["disabled"],bt=y(()=>d("div",{style:{clear:"both"}},null,-1));function Ct(o,t,e,r,s,i){return g(),m("div",null,[e.showChooseBtn===!0&&e.isModal===!0?(g(),m("div",{key:0,onClick:t[0]||(t[0]=(...l)=>i.handleOpen&&i.handleOpen(...l))},[B(o.$slots,"openImgCutter",{},void 0,!0),B(o.$slots,"open",{},void 0,!0)])):x("",!0),!o.$slots.openImgCutter&&!o.$slots.open&&e.isModal===!0?(g(),m("button",{key:1,type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=(...l)=>i.handleOpen&&i.handleOpen(...l))},c(e.label),1)):x("",!0),T(O,{name:"fade"},{default:k(()=>[s.visible?(g(),m("div",{key:0,class:b(e.isModal===!0?"mask vue-img-cutter":""),ref:"mask"},[s.visible?(g(),m("div",{key:0,class:b(e.isModal===!0?"dialogBoxModal":"dialogBox")},[T(O,{name:"fade","enter-class":"fade-in-enter","enter-active-class":"fade-in-active","leave-class":"fade-out-enter","leave-active-class":"fade-out-active"},{default:k(()=>[d("div",{ref:"dialogMainModalRef",class:b(e.isModal===!0?"dialogMainModal":"dialogMain"),style:p("width:"+(e.isModal===!0?e.boxWidth+32:e.boxWidth)+"px")},[d("div",Z,[e.isModal===!0?(g(),m("div",_,[I(" 图片裁剪 "),d("span",{class:"closeIcon",onClick:t[2]||(t[2]=(...l)=>i.handleClose&&i.handleClose(...l))},"×")])):x("",!0),d("div",{ref:"toolBox",style:p("height:"+e.boxHeight+"px;width:"+e.boxWidth+"px"),onMousemove:t[30]||(t[30]=(...l)=>i.controlBtnMouseMove&&i.controlBtnMouseMove(...l)),onMouseup:t[31]||(t[31]=(...l)=>i.controlBtnMouseUp&&i.controlBtnMouseUp(...l)),onMouseleave:t[32]||(t[32]=(...l)=>i.controlBtnMouseUp&&i.controlBtnMouseUp(...l)),class:"toolBox"},[C(d("div",$,[d("div",{class:"btn btn-warning btn-xs",onClick:t[3]||(t[3]=(...l)=>i.chooseImg&&i.chooseImg(...l))},c(e.label),1)],512),[[M,!s.drawImg.img&&e.showChooseBtn===!0]]),e.tool==!0?C((g(),m("div",{key:0,class:"dockMain",style:p("background:"+e.toolBgc),onMouseenter:t[14]||(t[14]=(...l)=>i.dropImgOff&&i.dropImgOff(...l))},[e.rate?(g(),m("div",tt,[B(o.$slots,"ratio",{},()=>[I(" Ratio: ")],!0),I(" "+c(e.rate),1)])):x("",!0),d("div",{class:"dockBtn",onClick:t[4]||(t[4]=(...l)=>i.scaleReset&&i.scaleReset(...l))},[B(o.$slots,"scaleReset",{},()=>[I(" Scale: ")],!0),I(" "+c(s.drawImg.swidth>0?(s.drawImg.width/s.drawImg.swidth).toFixed(2):"-"),1)]),e.originalGraph===!1?(g(),m("div",{key:1,onClick:t[5]||(t[5]=l=>i.turnImg(-90)),class:"dockBtn"},[B(o.$slots,"turnLeft",{},()=>[I(" ↳ ")],!0)])):x("",!0),e.originalGraph===!1?(g(),m("div",{key:2,onClick:t[6]||(t[6]=l=>i.turnImg(90)),class:"dockBtn"},[B(o.$slots,"turnRight",{},()=>[I(" ↲ ")],!0)])):x("",!0),e.originalGraph===!1?(g(),m("div",{key:3,onClick:t[7]||(t[7]=l=>i.turnReset()),class:"dockBtn"},[B(o.$slots,"reset",{},()=>[I(" ↻ ")],!0)])):x("",!0),e.originalGraph===!1?(g(),m("div",et,[d("div",{ref:"dockBtnScrollControl",onMousemove:t[8]||(t[8]=(...l)=>i.scrollBarControlMove&&i.scrollBarControlMove(...l)),onMousedown:t[9]||(t[9]=(...l)=>i.scrollBarControlOn&&i.scrollBarControlOn(...l)),onMouseleave:t[10]||(t[10]=(...l)=>i.scrollBarControlOff&&i.scrollBarControlOff(...l)),onMouseup:t[11]||(t[11]=(...l)=>i.scrollBarControlOff&&i.scrollBarControlOff(...l)),style:p("left:"+s.rotateControl.position+"px"),class:"scrollBarControl"},null,36),s.rotateControl.active==!0?(g(),m("div",{key:0,class:"scrollBarText",style:p("left:"+s.rotateControl.position+"px")},c(s.rotateImg.angle.toFixed(0)+"°"),5)):x("",!0)])):x("",!0),e.originalGraph===!1?(g(),m("div",{key:5,onClick:t[12]||(t[12]=(...l)=>i.flipHorizontal&&i.flipHorizontal(...l)),class:"dockBtn"},[B(o.$slots,"flipHorizontal",{},()=>[I(" ⇆ ")],!0)])):x("",!0),e.originalGraph===!1?(g(),m("div",{key:6,onClick:t[13]||(t[13]=(...l)=>i.flipVertically&&i.flipVertically(...l)),class:"dockBtn"},[B(o.$slots,"flipVertically",{},()=>[I(" ⇅ ")],!0)])):x("",!0)],36)),[[M,s.drawImg.img&&s.dropImg.active!==!0&&s.controlBox.disable==!0&&s.toolBox.disable==!0]]):x("",!0),C(d("div",{ref:"toolBoxControl",onMousedown:t[23]||(t[23]=(...l)=>i.toolBoxMouseDown&&i.toolBoxMouseDown(...l)),onMouseup:t[24]||(t[24]=(...l)=>i.toolBoxMouseUp&&i.toolBoxMouseUp(...l)),onMousemove:t[25]||(t[25]=(...l)=>i.toolBoxMouseMove&&i.toolBoxMouseMove(...l)),onMouseleave:t[26]||(t[26]=(...l)=>i.toolBoxMouseLeave&&i.toolBoxMouseLeave(...l)),class:"toolBoxControl",style:p({pointerEvents:e.moveAble?"auto":"none"})},[d("div",ot,[d("div",it,[lt,st,rt,ht,d("div",at," 宽:"+c(i.showToolBoxWidth)+" 高:"+c(i.showToolBoxHeight)+" (x:"+c(i.showToolBoxX)+",y:"+c(i.showToolBoxY)+") ",1),e.sizeChange===!0?(g(),m("div",{key:0,"data-name":"leftUp",onMousedown:t[15]||(t[15]=l=>i.controlBtnMouseDown(l,"leftUp")),class:"leftUp controlBtn"},null,32)):x("",!0),e.sizeChange===!0?(g(),m("div",{key:1,"data-name":"leftDown",onMousedown:t[16]||(t[16]=l=>i.controlBtnMouseDown(l,"leftDown")),class:"leftDown controlBtn"},null,32)):x("",!0),e.sizeChange===!0?(g(),m("div",{key:2,"data-name":"rightUp",onMousedown:t[17]||(t[17]=l=>i.controlBtnMouseDown(l,"rightUp")),class:"rightUp controlBtn"},null,32)):x("",!0),e.sizeChange===!0?(g(),m("div",{key:3,"data-name":"rightDown",onMousedown:t[18]||(t[18]=l=>i.controlBtnMouseDown(l,"rightDown")),class:"rightDown controlBtn"},null,32)):x("",!0),e.sizeChange===!0&&!e.rate&&s.toolBox.width>20?(g(),m("div",{key:4,"data-name":"topCenter",onMousedown:t[19]||(t[19]=l=>i.controlBtnMouseDown(l,"topCenter")),class:"topCenter controlBtn"},null,32)):x("",!0),e.sizeChange===!0&&!e.rate&&s.toolBox.width>20?(g(),m("div",{key:5,"data-name":"downCenter",onMousedown:t[20]||(t[20]=l=>i.controlBtnMouseDown(l,"downCenter")),class:"downCenter controlBtn"},null,32)):x("",!0),e.sizeChange===!0&&!e.rate&&s.toolBox.height>20?(g(),m("div",{key:6,"data-name":"leftCenter",onMousedown:t[21]||(t[21]=l=>i.controlBtnMouseDown(l,"leftCenter")),class:"leftCenter controlBtn"},null,32)):x("",!0),e.sizeChange===!0&&!e.rate&&s.toolBox.height>20?(g(),m("div",{key:7,"data-name":"rightCenter",onMousedown:t[22]||(t[22]=l=>i.controlBtnMouseDown(l,"rightCenter")),class:"rightCenter controlBtn"},null,32)):x("",!0)]),nt,dt,gt,mt])],36),[[M,s.drawImg.img!=null]]),d("div",xt,[e.DoNotDisplayCopyright?x("",!0):(g(),m("a",ut," vue-img-cutter "+c(s.version),1))]),d("canvas",{class:"canvasSelectBox",ref:"canvasSelectBox",width:e.boxWidth,onMousedown:t[27]||(t[27]=(...l)=>i.dropImgOn&&i.dropImgOn(...l)),onMouseup:t[28]||(t[28]=(...l)=>i.dropImgOff&&i.dropImgOff(...l)),onMousemove:t[29]||(t[29]=(...l)=>i.dropImgMove&&i.dropImgMove(...l)),height:e.boxHeight},null,40,ft),d("canvas",{class:"canvas",ref:"canvas",width:e.boxWidth,height:e.boxHeight},null,8,wt)],36)]),d("div",Bt,[d("input",{onChange:t[33]||(t[33]=(...l)=>i.putImgToCanv&&i.putImgToCanv(...l)),ref:"inputFile",type:"file",accept:e.accept,style:{width:"1px",height:"1px",border:"none",opacity:"0"}},null,40,ct),d("span",{onClick:t[34]||(t[34]=(...l)=>i.chooseImg&&i.chooseImg(...l))},[B(o.$slots,"choose",{},()=>[e.showChooseBtn===!0?(g(),m("div",It,c(e.label),1)):x("",!0)],!0)]),d("div",yt,[d("span",{onClick:t[35]||(t[35]=(...l)=>i.handleClose&&i.handleClose(...l))},[B(o.$slots,"cancel",{},()=>[pt],!0)]),d("span",{onClick:t[36]||(t[36]=l=>i.cropPicture(!1))},[B(o.$slots,"confirm",{},()=>[d("button",{type:"button",class:"btn btn-primary",style:{"margin-left":"15px"},disabled:!s.drawImg.img}," 确定 ",8,vt)],!0)])])])],6)]),_:3}),bt],2)):x("",!0)],2)):x("",!0)]),_:3})])}const Tt=q(Q,[["render",Ct],["__scopeId","data-v-283347e7"]]);export{Tt as I,q as _};
