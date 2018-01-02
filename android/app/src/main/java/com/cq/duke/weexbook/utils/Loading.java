package com.cq.duke.weexbook.utils;

import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;

import com.cq.duke.weexbook.R;


/**
 * Created by daiwenjun on 17/4/19.
 */

public class Loading {
    private Dialog pd;
    public static Dialog getDialog(Context context){
        return new Loading().showloading(context);
    }
    public Dialog showloading(Context context){
        LayoutInflater factory = LayoutInflater.from(context);
        View view = factory.inflate(R.layout.loading, null);
        pd = new Dialog(context, R.style.dialog_style);
        pd.setContentView(view);
        return pd;
    }
}
