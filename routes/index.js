var express = require('express');
var router = express.Router();


var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {


    var chuoi=file.originalname;
    var duoi=file.originalname.slice(chuoi.length-4,chuoi.length);
   //  if (!duoi.equal('jpg')) {
   // //  req.fileValidationError = 'Only image files are allowed!';
   //    return file.send("ko phải jpg !!!")
   //  }
    if(duoi=='.jpg'){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+chuoi)
    }else {
      cb('khong phải file jpg',null)
    }

  }
})

// var upload = multer({ storage: storage }).single('avatar')
var upload1=multer({
  storage:storage,limits:{
    fileSize:2+1024*1024,
    files:2,
  },




}).array('avatar')

router.post('/profile',function (req
    ,res,next){

  console.log('Step 1');
  upload1(req, res, function (err){

    if(err){
      if (err instanceof multer.MulterError) {
        if(err=='MulterError: Too many files'){
          return res.send("Tối da 2 file !!!")
        }
        if(err=='MulterError: File too large'){
          return res.send("Tối da 2MB !!!")
        }

      }
      res.send(' ' +err);
      return;
    }else {
      res.send('Đã Thành công');
      return;
    }
  });
});
// router.post('/profile',upload.single('avatar'),function (req
//     ,res){
//   res.send('oke roi nhe');
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
