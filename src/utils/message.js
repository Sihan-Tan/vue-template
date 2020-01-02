/**
 * 视频消息处理
 * @param {number} status 视频消息状态
 */
export const videoCallHandler = {
  1: {
    text: '创建房间，等待',
    handler({ roomId }) {
      this.$toast.clear();
      this.$dialog
        .alert({
          message: '正在接通中...',
          confirmButtonText: '挂断'
        })
        .then(() => {
          // 未接通提前挂断
          this.sendMsg({
            msg_type: 5,
            call_type: 6,
            messages: JSON.stringify({
              roomId
            })
          });
        });
    }
  },
  2: {
    text: '收到通话邀请',
    handler({ roomId }) {
      this.$dialog
        .confirm({
          title: '对方邀请您进行视频通话',
          message: '是否接通？'
        })
        .then(() => {
          // 接听 call type 2
          this.sendMsg({
            msg_type: 5,
            call_type: 3,
            messages: JSON.stringify({
              roomId
            })
          }).then(res => {
            this.linkCall(roomId);
          });
        })
        .catch(() => {
          // 拒接
          this.sendMsg({
            msg_type: 5,
            call_type: 4,
            messages: JSON.stringify({
              roomId
            })
          });
        });
    }
  },
  3: {
    text: '收到接听消息，进入房间',
    handler({ roomId }) {
      this.$dialog.close();
      this.linkCall(roomId);
    }
  },
  4: {
    text: '拒接'
  },
  5: {
    text: '收到拒接消息',
    handler() {
      this.$dialog.close();
    }
  },
  7: {
    text: '收到提前挂断消息',
    handler({ showToast }) {
      this.$dialog.close(showToast);
      showToast && this.$toast('对方已挂断');
    }
  },
  8: {
    text: '双方通话中'
  }
};
