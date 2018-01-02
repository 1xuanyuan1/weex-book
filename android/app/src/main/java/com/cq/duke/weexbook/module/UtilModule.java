package com.cq.duke.weexbook.module;

import android.app.Dialog;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.cq.duke.weexbook.utils.Loading;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;

import static android.content.Context.MODE_PRIVATE;

/**
 * Created by daiwenjun on 17/5/4.
 * 安卓跟weex交互的工具类
 */

public class UtilModule extends WXModule{
    private Dialog dialog = null;
    private MyModuleListener myModuleListener = null;
    private SharedPreferences mySharedPreferences;
    private SharedPreferences.Editor editor;

    public interface MyModuleListener{
        public void setMyTitle(String title);
    };

    /**
     * 保存书籍 (测试的时候用的,暂时没有用到)
     * @param books
     */

    @WXModuleAnno(runOnUIThread = true)
    public void saveMyBooks (String books) {
        System.out.println(books);
        Toast.makeText(mWXSDKInstance.getContext(), "saveMyBooks", Toast.LENGTH_SHORT).show();
    }

    /**
     * 写入缓存信息
     * @param key
     * @param value
     */
    @WXModuleAnno(runOnUIThread = true)
    public void writeCache (String key, String value) {
        mySharedPreferences = mWXSDKInstance.getContext().getSharedPreferences("cache", MODE_PRIVATE);
        editor = mySharedPreferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    /**
     * 读取缓存信息 (不能直接返回想要的数据 直接通过自带的回调函数去回调)
     * @param key
     * @param callback js回调
     */
    @WXModuleAnno(runOnUIThread = true)
    public void readCache (String key, JSCallback callback) {
        mySharedPreferences = mWXSDKInstance.getContext().getSharedPreferences("cache", MODE_PRIVATE);
        String value = mySharedPreferences.getString(key, "");
        callback.invoke(value);
    }
    /**
     * 设置标题内容
     * @param title
     */
    @WXModuleAnno(runOnUIThread = true)
    public void setTitle (String title) {
        if (null == myModuleListener) {
            myModuleListener = (MyModuleListener) mWXSDKInstance.getContext();
        }
        myModuleListener.setMyTitle(title);
    }

    /**
     * 显示加载框
     */
    @WXModuleAnno(runOnUIThread = true)
    public void showDialog () {
        if (null == dialog) { // 若加载框不存在则创建
            dialog = Loading.getDialog(mWXSDKInstance.getContext());
            dialog.show();
        }
    }

    /**
     * 隐藏加载框
     */
    @WXModuleAnno(runOnUIThread = true)
    public void hiddenDialog () {
        if (null != dialog) { // 若加载框存在 则关闭加载框并制为null
            dialog.cancel();
            dialog = null;
        }
    }
}
