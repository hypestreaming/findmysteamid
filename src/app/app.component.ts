import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClipboardService} from "./services/clipboard.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	steam_id: string;

	openid_link = 'https://steamcommunity.com/openid/login?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.realm=https://findmysteamid.s3.amazonaws.com&openid.return_to=https://findmysteamid.s3.amazonaws.com/index.html';

	constructor(private activatedRoute: ActivatedRoute, private clipboard: ClipboardService) {

	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe((map) => {
			if (map['openid.claimed_id']) {
				const claimed_id = map['openid.claimed_id'];
				if (claimed_id.startsWith("https://steamcommunity.com/openid/id/")) {
					const id = claimed_id.substr("https://steamcommunity.com/openid/id/".length);
					this.steam_id = id;
				}
			}
		});
	}

	onCopyToClipboardClicked() {
		this.clipboard.copyToClipboard(this.steam_id);
	}
}
