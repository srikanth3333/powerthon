import requests
from bs4 import BeautifulSoup

proxies = {
    'http':'http://192.109.165.115:80',
    'https':'https://192.109.165.115:80',
}

payload = {
    '__LASTFOCUS': '',
    '__EVENTTARGET': 'btnSubmit',
    '__EVENTARGUMENT': '', 
    '__VIEWSTATE': 'mbvxtSA4a0AISQWOe6lsh/6Si6L6SaUnSyJTpR0QZtpF6b3drmJTwy+sX+74xWEpQXonU6YLU2MEpXwJj/20Q29q1r0WlCkR6bTItmUm8Jo=',
    '__VIEWSTATEGENERATOR': '05CD68EB',
    '__EVENTVALIDATION': '0FOKGSH/KjPpJs/uv9kETAoiki+xZEdTZV05gb64iaegTtDlJvR9+B7ZC85eJqc+g3cn02OotsdfLm8MnTohdVZpPqvj4nODzN0tMTzM/VJsfnuhbuA+emDwoqqH5ygSNSwY52oPxTJZu69ycPnq6cnYCh80a5CzByjw23ptB6g=',
    'txtUserName': 'admin',
    'txtPassword': 'Bosco*123456*YYYYMMMDD*PWD*MAN',
}
session = requests.Session()

main = session.post("http://ngmiweb.com/subs-cg-page/in.aspx", data=payload, proxies=proxies)

page = BeautifulSoup(main.text, "html.parser")

options = page.find_all("option")

load = {
        '__VIEWSTATE': 'dViKaTCR7ilazutnZFwtDEEallWZQ4oJOdWBO0l66dHcTwP3JCYtD6uK0kNyXD9HEj+GDIOUUXaSQ3+KAm/hYKtcNnlAGZbwz7svnYjclsNtd+H2m+jRAAVaSPhRYdkl',
        '__VIEWSTATEGENERATOR': '5641A054',
        '__EVENTVALIDATION': 'UxCG9LhadxYjwbNBjSzifqUV2aEjK89knHbofxpytfas0MztH/d+JJAEG8wTM24rGKRV+0UbUrcHZC4ggehlgu/Lr9a9RLCGqMgPPFPlg2SH9R4jZTTsMw/YMLqYp/TFoAMUEZ2dqzaX7pZnUKM7cFtcWiPV8YvD1TiD9w5O6v1f95RdwoCS5WuLuhzljzENkNJhpPBEf9CfmQJOppGVIf2Pg77rPWApr5ijw1MFbXyXZcvvDyUIZXXXtDqeYXCe4zTXrWgHTmC4rSQ+FqNrAB4fVvBxOzBU1clbJNJ1c/8wrwo1EdFxlAbvZnkK94tsRdyU1SOxJROqa/ok4jZsYZkjLC3uQ9Q4ziPz5sA1soKPJPubLEHdi3tffriqgyHfGJ8e3eLw0xFtYJsiz9xbj1e3R8WO5vr+WYhfOtlmpgh62BthJ68mb9k8p+X1aEyVSI2GDKadSmmd20my37QB1w==',
        'ddlDevice': 'S',
        'ddlService': '158',
        'ddlMobileType': '0',
        'btnStart': '1.Get data',
}

u = session.post('http://ngmiweb.com/subs-cg-page/ads/confirmpin.aspx', data=load, proxies=proxies)

mobile = BeautifulSoup(u.content, 'html.parser')
mobile_num = mobile.find_all(id='txtmsisdn')
service = mobile.find_all(id='ddlService')
m_type = mobile.find_all(id='ddlMobileType')
mb = mobile.find_all(id='ddlDevice')
#main_num = mobile_num[0]["value"]
#print(main_num)

load_btn = {
    '__VIEWSTATE': 'XG1UklmR3maiwxKPCIcOH4uD0xXVIzJfPX+IEqAbh9coz7oUWbIdSa4Nv9L5NToXD6iBpXbJIfu3SpT86zRQo4bA4NklGx8fl68He2EhtV8c3Kr7X1idCHvXaFkyTrvMKE1v4p+uMfzadOIaRV5+6ang45uj3pyfmNcb8vyJhF+9ipkLd04WI7kDtFNqgRZVV2AFeOedCUa40OXsP6zQSApBuO7wclSSWzf3rmili8AffeW29n1z0JZWS+C8A92RekrTGMbOkGmk+J+ZHkXI1DUXgRbF59DdKxVk/3zNQPkHLzx17ikxHDO16EV/vtZXaf02Krf2HncA8j1qNhZ5+ZH7i/5XvmTS1fgsCA7wPPkQwhYYSf7x1fNT520qiAhDU4lebuIOo03jEfBKizNKenXWguJMiEZGp7j1dTnYdlJvAYtoveWvDrXjkJNivs7D+/cRYYDOrPAm34OuZIBpfLp5N4PwvPQCFp3cU3jLqiYU5AE/4087qPFtEFTH6/xpgyG9TBCxMiL2G6elVKs2k3/aejpu0sRO6bDh4jSnIEwImlGqyJXEL9DaPcFRAxPwl7tii032muSE0vV0LXJ3EPHvWvwUUKVrdATjuJjnO/cAKrKCrA5a7wFZBnZwJBlxUvWehwNKkw6mlaDiqlRZcYQnk8L2gv2FDiEER7PmvbvCvblsompGapizDuNjHR9Kdtxxynd4fwnJhQyCRHp0sX9qix2YfXs8lz6QRZlyKe/Uok9WVOsaNb0nkVhPnOOJ1SjlXsEOgDm1tcQhcRKQloV/Aqf4W4qnItcEHpEbuVMUr4HkW1WWk0p/AkEC9ZOHL7mlhBIL+CEXuSGJHjwuwxDWBqWh59OJNTBiYll0QKUWsBJCthiG3xEDjj5gobMnhtIk5V6Iw8ab56E5xh54fAQzdqJINQq/s2e53LD55yGLz83E1KGGprwrQEOhhe3uzwVzz0PI0dVLEDOet451HCJCpDTG2MpJLIdGqxcVY7p5+MjVgc6OnzMzzfjarMxjZEcL983pzoMHRLC/5TbrxgEzqCYMZovPXWE+caw4+LFxEvL3fsaM2m0gh7PeMlDCckzbjG9PMzJ0H/jSJY0LpeduJ5wt4BvdSV+9nzO01OtVPH/M7EHw3lAagxFrIN4XKB4zeRxkbT2rdm5CZOgmqeWQ25kjS4AQy0VvTVvt8G9PdffIwGmZrOAeXIb9sxXHyqAosWhg89gJyBa8brLtS826taPHrgnZ/XyXEcNPl0xYWKnpH56OpMoaGIHkmJevn8AP8FbEdxjodVnjvo3SgUVFbn59kALh1t89MRZvzvQ/aE78wBc4/NaTv03VAT3V38PPXpF8EHU9ZS+gfpRBT+6RXNUMVE8v4j9OiDJ9CLOByxZiZEBSVLbvWm8yHCJykBgruiFZk07jctgQWhOT8S+sKxRCiWE8ekSBpcJk+tRr32ElZbLZCUZCPX3bGkF2sMdHs/LBRa8fw+MvoafXj1OboFVyi+0WEDGs0k8logHeyxA25Y+27K6GTS0YMqGsQKzShYq93CQXnHbwjzwO6OBi4ADzI1WpY+qo3JRxnCw=',
    '__VIEWSTATEGENERATOR': '5641A054',
    '__EVENTVALIDATION': 'Lh+rHaeYMqsUEtOuxFI/kvIHzrNdOjgaD7Y2BSTKtpdZ0aw4CAdhvvZnTjSoAHEN3+DpYgp1WmXd2GGDV54rkROr07JsbroptIl0Mt0ivIwTSFsGKARJkKIrXP2QCrIKKhBivdRDdfhg+Kf8nSpi4ZRa1x6urKra+yD1U7RbdBd8N3yfDz9y8XSCB17C9UUa6zaKjYz2oNT2nsaoW9qyvg/1JFfa8h0UAIc/2/MQJAd/GnFBHt7gsZgJAgXzWL1l3+X0braoq4zWmIDZWWbsfuMGUfL/64Xy8Zm9eLQEJprKvGrbM2QJZD4OI/Aw4/ojJvnfJS3jZGVB4XGB+mPDhWZSQzGaQlilGAOgp+Oel2A2kSR3i/OHz/FYxk+73pi7LMjFSlbB1K4S62Hg+gvK748LVIHV+nKy9vqBESZ8aYUUQMrVOVnA5Ba8RWIIS+pPrMdW4pZALPLFRlYSn9Y+v1hR9EdngG5+IX7VI0sNOdDQmcCvSk40gYkbPfyDz8Yxy/PvtmIZvnru5RSu+AGPdCM8QRH5G8cXnxheYWHHEaTsEUZzhwQ6T0w1c327Yf+FR9k/SDNKHPlqbDu8YrNwsQ==',
    'ddlDevice': 'S',
    'ddlService': '158',
    'ddlMobileType': '0',
    'txtmsisdn': main_num,
    'txtIP': '37.231.77.23',
    'txtHeader': {"Cache-Control":"max-age=0","Connection":"keep-alive","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","Accept-Encoding":"gzip,deflate","Accept-Language":"en-IN,en;q=0.9,en-GB;q=0.8,en-US;q=0.7,te;q=0.6,es;q=0.5","Host":"ngmiweb.com","Referer":"http://ngmiweb.com/ngmi/mi/mrf/sub.aspx?txid=637546353279660422","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1","Upgrade-Insecure-Requests":"1","Save-Data":"on"},
    'btnLoad': '3.Load Data',
}


a_u = session.post('http://ngmiweb.com/subs-cg-page/ads/confirmpin.aspx', data=load_btn, proxies=proxies)

print(a_u.text)


