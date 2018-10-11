var browser = browser || chrome;

//クリック時のイベントハンドラ
//info引数にイベントを発行した側のデータが入る。tabはなんだ？
function menu_GoogleSearch_Extension_Clicked(info, tab) {
	let text = info.selectionText.trim();//info.selectionTextプロパティに選択中の文字列が入っている。



	//Google検索URLを構築。
	//選択中の文字列はGoogleに検索文字列として渡すのでURIエンコードする。
	let encoded = encodeURIComponent(text);
	let serviceCallUrl = 'https://www.google.co.jp/search?q=' + encoded;

	//新しいタブを作成し、
	//上で作成したURLを開く。
	browser.tabs.create({ url: serviceCallUrl });
}


//コンテキストメニューに項目を追加
//createメソッドにJSONデータを渡す。
browser.contextMenus.create(
	{
		id: 'menu_GoogleSearch_Extension',//idを振る。なんでもいいのか？
		title: '"%s"をGoogle検索',//表示する内容。%sの部分に選択中の文字列が入る
		contexts: ['selection'],//ブラウザ上で何かしらの選択状態にある場合に表示されるようにする。ほかにどんな指定ができるのかはわからない。
		onclick: menu_GoogleSearch_Extension_Clicked//クリック時のイベントハンドラを指定。
	}
);

