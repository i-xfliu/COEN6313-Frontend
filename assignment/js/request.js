window.onload = function () {
  var $button = $('#submit_btn');
  // var $button = document.querySelector('.button');
  $button.click(function() {
  sendRequest();
  return false;
  });
}
var url_json = "http://10.162.0.2:4800/v1/batches/json";
var url_protcol = "http://10.162.0.2:4800/v1/batches/proto";
var RFW_ID = "jf3458rw-3rjdc134fr-a1eif03r52";


var sendRequest = function() {
  var branch = $("#main-branch option:selected").val();
  var datasetType = $("#property-dataset-type option:selected").val();
  var workloadMetric = $("#workload-metric option:selected").val();
  var serialType = $("#serialization-type option:selected").val();
  var batchUnit = parseInt($(" input[ name='batch-unit' ] ").val());
  var batchId = parseInt($(" input[ name='batch-id' ] ").val());
  var batchSize = parseInt($(" input[ name='batch-size' ] ").val());
  // if (serialType.indexOf("text", 0) < 0) {
  //   protobuf.load("../plugins/proto/dataCommunication.proto", function (err, root) {
  //     if (err != null)
  //       throw err;
  //     // Obtain a message type
  //     const RequestModel = root.lookupType("Request");
  //     const message = RequestModel.create({
  //       branch: branch, RFW_ID: RFW_ID,
  //       datasetType: datasetType, workloadMetric: workloadMetric, batchUnit: batchUnit,
  //       batchId: batchId, batchSize: batchSize
  //     });
  //     let buffer = RequestModel.encode(message).finish();
  //     $.ajax({
  //       type: "POST",
  //       url: url_protcol,
  //       data: buffer,
  //       success: function (data, textStatus, jqXHR) {
  //         dd = this.data;
  //         protobuf.load("../plugins/proto/dataCommunication.proto", function (err, root) {
  //           if (err != null)
  //             throw err;
  //           // Obtain a message type
  //           const ResponseModel = root.lookupType("Response");
  //           var msg = ResponseModel.decode(new Uint8Array(data)); // resMassage 为提前创建的返回pb类型对象  response为ajax  success函数返回值
  //           ResponseModel;
  //           var resObj = ResponseModel.toJSON(msg);
  //           ResponseModel.RFW_ID;
  //         });
  //         $("#message").text("User with key " + user.getApikey() + " saved");
  //       },
  //       contentType: false,
  //       processData: false
  //     });
  //
  //     //   fetch(url_protcol, {
  //     //     method: 'POST',
  //     //     headers: {
  //     //       "Content-Type": "application/protobuf"
  //     //     },
  //     //     body: buffer
  //     //   }).then(res => res.arrayBuffer()) // 坑点！ arrayBuffer（） 很关键，坑点，必须用arrayBuffer返回处理
  //     //     .catch(error => console.log('Error:', error))
  //     //     .then(response => {
  //     //       console.log('response',response)
  //     //       var msg = resMessage.decode(new Uint8Array(response))
  //     //       var resObj = resMessage.toObject(msg)
  //     //       console.log('resObj', resObj)
  //     //     }, err => {
  //     //       console.log('err', err)
  //     //     })
  //     //
  //     // });
  //
  //   });
  //
  // } else {
    $.ajax({
      type: 'POST',
      url: url_json,
      data: {
        branch: branch,
        datasetType: datasetType,
        workloadMetric: workloadMetric,
        batchUnit: batchUnit,
        batchId: batchId,
        batchSize: batchSize,
        RFWID: RFW_ID
      },
      success: function(data, textStatus, jqXHR) {
        if(data.RFW_ID == RFW_ID) {
          let words = "Repsonse is： ";
          const last_batch_id = data.last_batch_ID;
          const workload_metrics = data.workload_metrics;
          words = words + "Last Batch ID: "+last_batch_id+"workLoad Metrics: "+workload_metrics+
            "Data Frame Example(1st Batch): ";
          var array = data.workload_data;
          var first_array = array[0];
          for(i = 0; i < first_array.length; i++){
            words = words + first_array[i];
          }

          }
      },
      dataType:"json"
    });
  // }
}
